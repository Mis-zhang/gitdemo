import {
  getTreeData,
  getProjectAndSubjectData,
  createTree,
  detailsTree,
  editTree,
  getNodeIdTree,
  createNodeTree,
  deleteNodeTree,
  editNodeTree,
  moveNodeTree,
  auditTree,
} from '../services/tree'
const callBack = (menu, parentKey) => {
  if (menu?.length) {
    return menu.map(item => {
      if (item.children && item.children.length > 0) {
        return {
          id: item.id,
          value: item.name,
          defaultValue: item.name,
          key: item.id,
          isEdit: false,
          isLeave: false,
          parentKey: parentKey,
          children: callBack(item.children, item.id),
        }
      } else {
        return {
          id: item.id,
          value: item.name,
          defaultValue: item.name,
          key: item.id,
          isEdit: false,
          isLeave: false,
          parentKey: parentKey,
        }
      }
    })
  }
  return []
}

const filterData = arr => {
  return arr
    .filter(item => item)
    .map(item => {
      if (item.children && item.children.length > 0) {
        item.children = filterData(item.children)
      }
      return item
    })
}
export default {
  state: {
    treeData: [],
    subjectData: [],
    detailsList: {},
    treeNodeData: [],
    total: 0,
    isTree: false,
  },
  reducers: {
    updateTree(state, payload) {
      return {
        ...state,
        ...payload,
      }
    },
    updateSubject(state, payload) {
      return {
        ...state,
        ...payload,
      }
    },
    updateDetails(state, payload) {
      return {
        ...state,
        ...payload,
      }
    },
    updateTreeNodeData(state, payload) {
      return {
        ...state,
        ...payload,
        // treeNodeData: callBack(payload),
      }
    },
  },
  effects: {
    // 获取知识树列表
    async getTreeData(payload) {
      const res = await getTreeData(payload)
      this.updateTree({
        treeData: res.data.records || [],
        total: res.data.total || 0,
      })
      return res
    },
    // 根据项目获取科目
    async getSubjectData(payload) {
      const res = await getProjectAndSubjectData(payload)
      this.updateSubject({
        subjectData: res.data || [],
      })
      return res
    },
    // 新建知识树
    async createTree(payload) {
      const res = await createTree(payload)
      return res
    },
    // 知识树详情
    async detailsTree(payload) {
      const res = await detailsTree(payload)
      this.updateDetails({
        detailsList: res.data || {},
      })
      const noderes = await getNodeIdTree(res?.data?.rootNodeId)
      let data = filterData(noderes.data)
      if (data && data.length > 0) {
        this.updateTreeNodeData({
          isTree: true,
          treeNodeData: callBack(data || [], null),
        })
      }
      return res
    },
    async editTree(payload) {
      const res = await editTree(payload)
      return res
    },
    // 获取知识点
    async getNodeIdTree(payload) {
      const res = await getNodeIdTree(payload)
      let data = filterData(res.data)
      if (data && data.length > 0) {
        this.updateTreeNodeData({
          isTree: true,
          treeNodeData: callBack(data || [], null),
        })
      }
      return res
    },
    // 添加节点
    async createNodeTree(payload) {
      const res = await createNodeTree(payload)
      return res
    },
    // 删除节点
    async deleteNodeTree(payload) {
      const res = await deleteNodeTree(payload)
      return res
    },
    // 编辑节点
    async editNodeTree(payload) {
      const res = await editNodeTree(payload)
      return res
    },
    // 移动节点
    async moveNodeTree(payload) {
      const res = await moveNodeTree(payload)
      return res
    },
    async auditTree(payload) {
      const res = await auditTree(payload)
      return res
    },
  },
}
