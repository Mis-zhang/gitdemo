import { getUserInfo } from '../services/user'
import { initToB } from '@kkb/watermarker'

export default {
  state: {
    userInfo: {},
  },
  reducers: {
    setUserInfo(state, userInfo) {
      // 水印
      initToB({
        username: userInfo.name,
        displayName: userInfo.name,
        uid: userInfo.uid,
      })
      return {
        ...state,
        userInfo,
      }
    },
  },
  effects: {
    async getUserInfo() {
      const res = await getUserInfo()
      const { sysUser = null } = res.data
      this.setUserInfo(sysUser || [])
    },
  },
}
