import request from '../../utils/request'
import { corgiBaseUrl } from '../../consts/env'

export const getMenuList = () => {
  return request.get(`${corgiBaseUrl}/upms/resource/client`)
}
