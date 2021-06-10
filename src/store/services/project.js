import request from '../../utils/request'

const getProjectList = payload => request.post(`/api/trs/base/console/project/page`, payload)

const addProject = payload => request.post(`/api/trs/base/console/project`, payload)

const editProject = payload => request.put(`/api/trs/base/console/project/${payload.id}`, payload)

const getProjectInfo = payload => request.get(`/api/trs/base/console/project/${payload.id}`)

export default {
  getProjectList,
  addProject,
  editProject,
  getProjectInfo,
}
