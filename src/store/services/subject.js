import request from '../../utils/request'

const getSubjectList = payload => request.post(`/api/trs/base/console/subject/page`, payload)

const addSubject = payload => request.post(`/api/trs/base/console/subject`, payload)

const editSubject = payload => request.put(`/api/trs/base/console/subject/${payload.id}`, payload)

const getSubjectInfo = payload => request.get(`/api/trs/base/console/subject/${payload.id}`)

export default {
  getSubjectList,
  addSubject,
  editSubject,
  getSubjectInfo,
}
