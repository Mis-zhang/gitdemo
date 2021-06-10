const Tree = () => import('@/views/TeachingWorkbench/Basic/TreeManage')
const Project = () => import('@/views/TeachingWorkbench/Basic/ProjectManage')
const Subject = () => import('@/views/TeachingWorkbench/Basic/SubjectManage')
const TreeEdit = () => import('@/views/TeachingWorkbench/Basic/TreeManage/TreeEdit')
export default [
  {
    path: '/app/teachingWorkbench/basic/tree',
    component: Tree,
    title: '知识树',
    content: '',
    paths: [
      {
        name: '教研工作台',
      },
      {
        name: '基础配置',
      },
      {
        name: '知识树',
      },
    ],
  },
  {
    path: '/app/teachingWorkbench/basic/tree/edit/:id',
    component: TreeEdit,
    title: '编辑内容',
    content: '',
    paths: [
      {
        name: '教研工作台',
      },
      {
        name: '基础配置',
      },
      {
        name: '知识树',
        path: '/app/teachingWorkbench/basic/tree',
      },
      {
        name: '编辑内容',
      },
    ],
  },
  {
    path: '/app/teachingWorkbench/basic/project',
    component: Project,
    title: '项目管理',
    content: '',
    paths: [
      {
        name: '教研工作台',
      },
      {
        name: '基础配置',
      },
      {
        name: '项目（SKU）管理',
      },
    ],
  },
  {
    path: '/app/teachingWorkbench/basic/subject',
    component: Subject,
    title: '科目管理',
    content: '',
    paths: [
      {
        name: '教研工作台',
      },
      {
        name: '基础配置',
      },
      {
        name: '科目管理',
      },
    ],
  },
]
