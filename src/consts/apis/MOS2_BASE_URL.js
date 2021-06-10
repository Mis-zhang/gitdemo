import { API } from '../../utils/env'

const USER = {
  DEFAULT: API.mos2BaseUrl,
  IS_EXISTS: `${API.mos2BaseUrl}/user/isExists`,
}

export default {
  USER,
}
