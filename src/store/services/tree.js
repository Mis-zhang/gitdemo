import request from '../../utils/request'
import { apiBaseUrl } from '../../consts/env'
const baseURL = process.env.NODE_ENV === 'production' ? apiBaseUrl : '/service'
// 获取知识树列表
export const getTreeData = payload => {
  return request.post(`/api/trs/base/knowledge-trees/page`, payload)
}
// 根据科目获取列表
export const getProjectAndSubjectData = id => {
  return request.get(`/api/trs/base/console/project/${id}/subject`)
}
// 新建知识树 基本信息
export const createTree = payload => {
  return request.post(`/api/trs/base/knowledge-trees/create`, payload)
}
// 知识树详情
export const detailsTree = id => {
  return request.get(`/api/trs/base/knowledge-trees/${id}`)
}
// 修改知识树名称
export const editTree = payload => {
  return request.put(`/api/trs/base/knowledge-trees`, payload)
}
// 根据节点ID获取知识树
export const getNodeIdTree = nodeId => {
  return request.get(`/api/trs/base/knowledge-nodes/${nodeId}/tree`)
}
// 添加节点
export const createNodeTree = payload => {
  return request.post(`/api/trs/base/knowledge-nodes/add`, payload)
}
// 删除节点
export const deleteNodeTree = ({ nodeId, rootId }) => {
  return request.post(`/api/trs/base/knowledge-nodes/${nodeId}/delete?rootId=${rootId}`)
}
// 编辑节点
export const editNodeTree = ({ nodeId, name }) => {
  return request.post(`/api/trs/base/knowledge-nodes/${nodeId}/edit?name=${name}`)
}
// 移动节点
export const moveNodeTree = payload => {
  // return request.post(`/api/trs/base/knowledge-nodes/move`, payload)
  return request.put(`/api/trs/base/knowledge-nodes/ranks`, payload)
}
// 审核
export const auditTree = ({ treeId, approvalDescription }) => {
  return request.post(
    `/api/trs/base/knowledge-trees/${treeId}/approval?approvalDescription=${approvalDescription}`,
  )
}
// 上传地址
export const actionApi = `${baseURL}/api/trs/base/knowledge-nodes/import`
// 下载地址
export const downloadApi = `https://sr.kaikeba.com/cdn/xlsx/epkj_知识树导入模板.xlsx?attname=知识树导入模板.xlsx`
