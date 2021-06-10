/**
 * 获取添加，编辑  api接口需要的data
 * @params a 返回获取到的值
 * @params data 原数组
 * @params value 当前输入框的value
 * @params key 当前点击dom 的key
 * @params index 当前点击dom 的下标
 * @params currentArray 当前点击所在的父级
 * @params moveData 移动时候如果是最外层的节点的treeData
 */
const nodeIdsParmas = {}
const idsParams = []
export const getNodeIds = (data, value, key, currentArray, type, moveData, info) => {
  for (var i = 0; i < data.length; i++) {
    if (data[i].key === key) {
      if (type === 'add') {
        nodeIdsParmas.name = value
        nodeIdsParmas.parentId = currentArray?.id || info.rootNodeId
        // nodeIdsParmas.nextNodeId = data[i + 1]?.id || null
        // nodeIdsParmas.preNodeId = data[i - 1]?.id || null
      }
      if (type === 'move') {
        if (currentArray && currentArray.children && currentArray.children.length > 0) {
          for (let j = 0; j < currentArray.children.length; j++) {
            idsParams.push(currentArray.children[j].id)
          }
        } else {
          for (let s = 0; s < moveData.length; s++) {
            idsParams.push(moveData[s].id + '')
          }
        }
        nodeIdsParmas.ids = idsParams
        nodeIdsParmas.parentId = currentArray?.id || info.rootNodeId
      }
    }
    if (data[i].children && data[i].children.length > 0) {
      getNodeIds(data[i].children, value, key, data[i], type, moveData, info)
    }
  }
  return nodeIdsParmas
}
/**
 * 获取展开全部的key
 */
const defaultKeysArray = []
export const getAllKeys = (data, current) => {
  for (let index = 0; index < data.length; index++) {
    if (current) {
      defaultKeysArray.push(current.key)
    }
    if (data[index].children && data[index].children.length > 0) {
      getAllKeys(data[index].children, data[index])
    }
  }
  return Array.from(new Set([...defaultKeysArray]))
}
/**
 * 鼠标移入
 * @params key 当前点击的key
 * @params data 源数组数据
 */
export const onMouseEnterStatus = (key, data) =>
  data.map(item => {
    if (item.key === key) {
      item.isLeave = true
    } else {
      item.isLeave = false
    }
    if (item.children && item.children.length > 0) {
      onMouseEnterStatus(key, item.children)
    }
    return item
  })
/**
 * 鼠标移出
 * @params key 当前点击的key
 * @params data 源数组数据
 */
export const onMouseLeaveStatus = (key, data) =>
  data.map(item => {
    if (item.key === key) {
      item.isLeave = false
    }
    if (item.children) {
      onMouseLeaveStatus(key, item.children)
    }
    return item
  })
/**
 * 添加第一级节点
 * @params data 原数组
 */
export const createFirstNode = data => [
  ...data,
  {
    value: '',
    defaultValue: '',
    key: Math.random(100),
    isEdit: false,
    isLeave: false,
  },
]

/**
 * 添加节点
 * @params key 当前点击的key
 * @params data 源数组数据
 */
export const addTreeNode = (key, data) =>
  data.map((item, index) => {
    if (item.key === key) {
      if (item.children && item.children.length > 0) {
        item.children = [
          ...item.children,
          {
            value: '',
            defaultValue: '',
            key: key + Math.random(100),
            isEdit: false,
            isLeave: false,
          },
        ]
      } else {
        item.children = []
        item.children = [
          ...item.children,
          {
            value: '',
            defaultValue: '',
            key: key + Math.random(100),
            isEdit: false,
            isLeave: false,
          },
        ]
      }
      return item
    }
    if (item.children && item.children.length > 0) {
      addTreeNode(key, item.children)
    }
    return item
  })
/**
 * 当添加节点时，失去焦点删除当前添加的节点
 */
export const deteleNodeValue = data => {
  for (let index = 0; index < data.length; index++) {
    const item = data[index]
    if (item && item.value === '') {
      data.splice(index, 1)
    }
    if (item.children && item.children.length > 0) {
      deteleNodeValue(item.children)
    }
  }
  return data
}
/**
 * 编辑节点
 * @params key 当前点击的key
 * @params data 源数组数据
 */
export const editTreeNode = (key, data) =>
  data.map(item => {
    if (item.key === key) {
      item.isEdit = true
    } else {
      item.isEdit = false
    }
    item.value = item.defaultValue
    if (item.children && item.children.length > 0) {
      editTreeNode(key, item.children)
    }
    return item
  })
/**
 * 删除节点
 * @params key 当前点击的key
 * @params data 源数组数据
 */
export const delTreeNode = (key, data) =>
  data.map((item, index) => {
    if (item.key === key) {
      data.splice(index, 1)
    }
    if (item.children && item.children.length > 0) {
      delTreeNode(key, item.children)
    }
    return item
  })
// 拖拽节点
export const loop = (data, key, callback) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].key === key) {
      return callback(data[i], i, data)
    }
    if (data[i].children) {
      loop(data[i].children, key, callback)
    }
  }
}
