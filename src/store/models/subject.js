import services from '../loadServices'
const { subject } = services
export default {
  state: {
    subjectList: [],
    total: 0,
  },
  reducers: {
    // 更新state
    updateSubject(state, payload) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: dispatch => ({
    // 获取列表
    async getSubjectList(payload) {
      let params = {
        ...payload,
        condition: {
          name: payload.condition.name || undefined,
        },
      }
      let res = await subject.getSubjectList(params)
      this.updateSubject({
        subjectList: res.data.records,
        total: res.data.total,
      })
      return res
    },
    // 添加/修改 科目
    async addEditSubject(payload) {
      let params = payload
      let res = {}
      if (params.id) {
        res = await subject.editSubject(params)
      } else {
        res = await subject.addSubject(params)
      }
      return res
    },

    // 获取科目信息
    async getSubjectInfo(payload) {
      let params = payload
      let res = await subject.getSubjectInfo(params)
      return res
    },
  }),
}
