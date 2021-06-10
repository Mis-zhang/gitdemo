import request from '../../utils/request'
import { corgiBaseUrl } from '../../consts/env'

export const getUserInfo = () => {
  return request.get(`${corgiBaseUrl}/upms/user/info`)
}
