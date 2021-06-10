import services from '../loadServices'
const { project, app, subject } = services

export default {
  state: {
    projectList: [],
    total: 0,
    projectTypaArr: [], // 项目分类
    allSubjectArr: [], // 所有科目
  },
  reducers: {
    // 更新state
    updateProject(state, payload) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: dispatch => ({
    // 获取列表
    async getProjectList(payload) {
      let params = {
        ...payload,
        condition: {
          ...payload.condition,
          name: payload.condition.name || undefined,
        },
      }
      let res = await project.getProjectList(params)
      this.updateProject({
        projectList: res.data.records,
        total: res.data.total,
      })
      return res
    },

    // 添加修改项目
    async addEditProject(payload) {
      let params = payload
      let res = {}
      if (params.id) {
        res = await project.editProject(params)
      } else {
        res = await project.addProject(params)
      }
      return res
    },

    // 获取项目信息
    async getProjectInfo(payload) {
      let params = payload
      let res = await project.getProjectInfo(params)
      return res
    },

    // 项目分类
    async getProjectsCategories() {
      let params = {
        page: 1,
        size: 10000,
        condition: {
          code: 'category_with_project',
        },
      }
      let res = await app.getProjectsCategories(params)
      let useArr = res.data?.records.map(item => {
        return {
          label: item.name,
          value: item.value,
        }
      })
      this.updateProject({
        projectTypaArr: useArr,
      })
      return res
    },

    // 所有科目
    async getAllSubjectList() {
      let params = {
        condition: {},
        page: 1,
        size: 100000,
      }
      let res = await subject.getSubjectList(params)
      let useArr = res.data?.records.map(item => {
        return {
          label: item.name,
          value: item.id,
        }
      })
      this.updateProject({
        allSubjectArr: useArr,
      })
      return res
    },
  }),
}
