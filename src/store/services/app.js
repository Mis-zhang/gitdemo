import request from '../../utils/request'
// 分类+项目聚合接口(项目分类)
const getProjectsCategories = payload => request.post(`/api/trs/base/sys-dict/page`, payload)

export default {
  getProjectsCategories,
}
