import { getMenuList } from '../services/menu'

const callBack = menu => {
  if (menu?.length) {
    return menu.map(item => {
      return {
        name: item.name,
        page: item.page,
        path: item.url,
        id: item.id,
        childMenu: callBack(item.children),
      }
    })
  }
  return []
}
export default {
  state: {
    menuList: [],
  },
  reducers: {
    setMenuList(state, info) {
      return {
        ...state,
        menuList: callBack(info),
      }
    },
  },
  effects: {
    async getMenuList() {
      const res = await getMenuList()
      const { resources = null } = res.data
      this.setMenuList(resources || [])
    },
  },
}
