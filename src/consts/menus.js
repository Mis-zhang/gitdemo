const MENUS = [
  {
    name: '基础配置',
    path: '/app/basic',
    icon: 'setting',
    childMenu: [
      {
        name: '知识树',
        path: '/app/basic/tree',
        component: 'views/TreeManage',
      },
      {
        name: '项目管理',
        path: '/app/basic/project',
        component: 'views/ProjectManage',
      },
      {
        name: '科目管理',
        path: '/app/basic/subject',
        component: 'views/ProjectManage',
      },
    ],
  },
]

export default MENUS
