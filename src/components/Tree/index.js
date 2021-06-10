import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Tree, message } from 'antd'
import Expand from './Action/Expand'
import Action from './Action'
import Edit from './Action/Edit'
import Create from './Action/Create'
import CreateFirst from './Action/CreateFirst'
import DraggableSwitch from './DraggableSwitch'
import {
  getNodeIds,
  onMouseEnterStatus,
  onMouseLeaveStatus,
  loop,
  getAllKeys,
  deteleNodeValue,
} from './Utils'
import './index.less'
const { TreeNode } = Tree

const TaskTree = props => {
  const { isTree, treeNodeData, isUploadFile } = props
  const [expandedKeys, setExpandedKeys] = useState([])
  const [autoExpandParent, setAutoExpandParent] = useState(false)
  // 组件加载默认展开全部
  const [isTreeKeysFirst, setIsTreeKeysFirst] = useState(true)
  useEffect(() => {
    setIsTreeKeysFirst(true)
    // eslint-disable-next-line
  }, [isUploadFile])
  useEffect(() => {
    if (isTreeKeysFirst) {
      setExpandedKeys(getAllKeys([...treeNodeData], null))
    }
    // eslint-disable-next-line
  }, [treeNodeData])
  useEffect(() => {
    return () => {
      props.updateTreeNodeData({
        isTree: false,
        treeNodeData: [],
      })
    }
    // eslint-disable-next-line
  }, [])
  // 展开全部/关闭全部
  const autoExpand = status => {
    setAutoExpandParent(status)
  }
  const expandKeys = keys => {
    setExpandedKeys(keys)
  }
  const hideAllNodes = keys => {
    setExpandedKeys([])
  }
  // 鼠标移入
  const onMouseEnter = (e, key) => {
    e.preventDefault()
    setIsTreeKeysFirst(false)
    props.updateTreeNodeData({ treeNodeData: [...onMouseEnterStatus(key, [...treeNodeData])] })
  }
  // 鼠标移出
  const onMouseLeave = (e, key) => {
    e.preventDefault()
    setIsTreeKeysFirst(false)
    props.updateTreeNodeData({ treeNodeData: onMouseLeaveStatus(key, [...treeNodeData]) })
  }
  // 点击图标展开事件
  const onExpand = (expandedKeys, a) => {
    setAutoExpandParent(a.expanded)
    setExpandedKeys(expandedKeys)
  }
  /**
   * 编辑节点
   */
  const [editValue, setEditValue] = useState('')
  const onEditTreeNode = ({ value, arr }) => {
    props.updateTreeNodeData({ treeNodeData: [...arr] })
    setEditValue(value)
  }
  const editActions = ({ value, nodeId, oldValue, arr }) => {
    if (value && value.trim() && value !== oldValue) {
      props.changeTreeLoading(true)
      props
        .editNodeTree({ nodeId, name: value })
        .then(res => {
          props
            .getNodeIdTree(props.detailsList.rootNodeId)
            .then(res => {
              props.changeTreeLoading(false)
            })
            .catch(err => {
              props.updateTreeNodeData({ treeNodeData: [...arr] })
              props.changeTreeLoading(false)
            })
        })
        .catch(err => {
          props.updateTreeNodeData({ treeNodeData: [...arr] })
          props.changeTreeLoading(false)
        })
      return
    }
    if (!value && !value.trim()) {
      message.warning('知识点名称不能为空')
    }
    props.updateTreeNodeData({ treeNodeData: [...arr] })
  }
  /**
   * 添加第一级节点
   */
  const createFirst = arr => {
    props.updateTreeNodeData({ treeNodeData: [...arr] })
  }
  /**
   * 添加节点
   */
  const onAddTreeNode = ({ key, arr }) => {
    setAutoExpandParent(true)
    setExpandedKeys([...expandedKeys, key])
    props.updateTreeNodeData({ treeNodeData: [...arr] })
  }
  const createActions = ({ value, key, type }) => {
    if (value && value.trim()) {
      props.changeTreeLoading(true)
      const obj = getNodeIds(treeNodeData, value, key, treeNodeData, 'add', [], props.detailsList)
      props
        .createNodeTree(obj)
        .then(res => {
          props
            .getNodeIdTree(props.detailsList.rootNodeId)
            .then(res => {
              props.changeTreeLoading(false)
            })
            .catch(err => {
              props.updateTreeNodeData({ treeNodeData: deteleNodeValue([...treeNodeData]) })
              props.changeTreeLoading(false)
            })
        })
        .catch(err => {
          props.updateTreeNodeData({ treeNodeData: deteleNodeValue([...treeNodeData]) })
          props.changeTreeLoading(false)
        })
      return
    } else {
      if (type && type === 'blur') {
        message.warning('取消添加知识点')
      }
      props.updateTreeNodeData({ treeNodeData: deteleNodeValue([...treeNodeData]) })
      return
    }
  }
  /**
   * 删除节点
   */
  const onDelTreeNode = ({ id, arr }) => {
    if (treeNodeData && treeNodeData.length === 1 && treeNodeData[0].id === id) {
      message.warning('至少保留一个知识点')
      return
    }
    props.changeTreeLoading(true)
    props
      .deleteNodeTree({ nodeId: id, rootId: props.detailsList.rootNodeId })
      .then(res => {
        props
          .getNodeIdTree(props.detailsList.rootNodeId)
          .then(res => {
            props.changeTreeLoading(false)
          })
          .catch(err => {
            props.updateTreeNodeData({ treeNodeData: [...treeNodeData] })
            props.changeTreeLoading(false)
          })
      })
      .catch(err => {
        props.updateTreeNodeData({ treeNodeData: [...treeNodeData] })
        props.changeTreeLoading(false)
      })
  }
  /**
   * 拖拽节点
   */
  const [draggable, setDraggable] = useState(false)
  const changeDraggable = status => {
    setDraggable(status)
  }
  const onDrop = info => {
    const dropKey = info.node.key
    const dragKey = info.dragNode.key
    const data = [...treeNodeData]
    let dragObj
    if (!info.dropToGap) {
      // Drop on the content
      let dragNodePos = info.dragNode.pos.split('-').length
      let nodePos = info.node.pos.split('-').length
      if (
        (dragNodePos - nodePos === 1 && info.node.parentKey === info.dragNode.parentKey) ||
        info.node.key === info.dragNode.parentKey
      ) {
        loop(data, dragKey, (item, index, arr) => {
          arr.splice(index, 1)
          dragObj = item
        })
        loop(data, dropKey, item => {
          item.children = item.children || []
          item.children.unshift(dragObj)
        })
        const obj = getNodeIds(data, '', info.dragNode.key, data, 'move', data, props.detailsList)
        dragActions({ obj, data })
      }
      return
    } else {
      let ar
      let i
      let dragNodePos = info.dragNode.pos.split('-').length
      let nodePos = info.node.pos.split('-').length
      if (
        info.dropPosition !== -1 &&
        dragNodePos - nodePos === 0 &&
        info.node.parentKey === info.dragNode.parentKey
      ) {
        loop(data, dragKey, (item, index, arr) => {
          arr.splice(index, 1)
          dragObj = item
        })
        loop(data, dropKey, (item, index, arr) => {
          ar = arr
          i = index
        })
        ar.splice(i + 1, 0, dragObj)
        const obj = getNodeIds(data, '', info.dragNode.key, data, 'move', data, props.detailsList)
        dragActions({ obj, data })
        return
      } else if (info.dropPosition === -1 && info.node.parentKey === info.dragNode.parentKey) {
        loop(data, dragKey, (item, index, arr) => {
          arr.splice(index, 1)
          dragObj = item
        })
        loop(data, dropKey, (item, index, arr) => {
          ar = arr
          i = index
        })
        ar.splice(i, 0, dragObj)
        const obj = getNodeIds(data, '', info.dragNode.key, data, 'move', data, props.detailsList)
        dragActions({ obj, data })
        return
      }
    }
    message.warning('知识点只允许在同父级内移动')
    return
  }
  const dragActions = ({ obj, data }) => {
    props.changeTreeLoading(true)
    props
      .moveNodeTree(obj)
      .then(res => {
        if (res.ok) {
          props.updateTreeNodeData({ treeNodeData: [...data] })
          props.changeTreeLoading(false)
        } else {
          props
            .getNodeIdTree(props.detailsList.rootNodeId)
            .then(result => {
              props.changeTreeLoading(false)
            })
            .catch(error => {
              props.changeTreeLoading(false)
            })
        }
      })
      .catch(err => {
        props
          .getNodeIdTree(props.detailsList.rootNodeId)
          .then(result => {
            props.changeTreeLoading(false)
          })
          .catch(error => {
            props.changeTreeLoading(false)
          })
      })
  }
  const renderTreeData = data => {
    data.map((item, index) => {
      if (item.isEdit) {
        item.title = (
          <Edit
            treeNodeData={[...treeNodeData]}
            itemInfo={item}
            defaultEditValue={editValue}
            editActions={editActions}
          />
        )
      } else {
        item.title = (
          <div
            className="tree-node"
            onMouseEnter={e => onMouseEnter(e, item.key)}
            onMouseLeave={e => onMouseLeave(e, item.key)}
          >
            <Create
              itemInfo={item}
              treeNodeData={[...treeNodeData]}
              createActions={createActions}
            />
            <Action
              itemInfo={item}
              treeNodeData={[...treeNodeData]}
              isApprovalStatus={props.isApprovalStatus}
              onEditTreeNode={onEditTreeNode}
              onAddTreeNode={onAddTreeNode}
              onDelTreeNode={onDelTreeNode}
            />
          </div>
        )
      }
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode title={item.value} key={item.key}>
            {renderTreeData(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode {...item} />
    })
  }

  return (
    <div className="task-tree">
      {isTree ? (
        <Fragment>
          <DraggableSwitch changeDraggable={changeDraggable} />
          <div className="tree-search">
            <Expand
              treeData={[...treeNodeData]}
              autoExpand={autoExpand}
              expandKeys={expandKeys}
              hideAllNodes={hideAllNodes}
            />
          </div>
          <div className="tree-init">
            <Tree
              treeData={[...treeNodeData] || []}
              showLine
              draggable={draggable}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onExpand={onExpand}
              onDrop={onDrop}
            >
              {renderTreeData([...treeNodeData] || [])}
            </Tree>
            <CreateFirst treeNodeData={[...treeNodeData]} createFirst={createFirst} />
          </div>
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
    </div>
  )
}
TaskTree.propTypes = {
  treeNodeData: PropTypes.array, //tree 数据源
  isTree: PropTypes.bool, //是否展示tree组件
  isSearch: PropTypes.bool, //是否展示搜索
  isShowNodes: PropTypes.bool, //是否展示展开/收起全部
  isDelete: PropTypes.bool, //是否可以删除节点
  isCreate: PropTypes.bool, //是否可以增加节点
  isEdit: PropTypes.bool, //是否可以删除节点
  isUploadFile: PropTypes.number,
  options: PropTypes.object, //antd tree 组价本身属性
  changeTreeLoading: PropTypes.func, //是否加载中
}
TaskTree.defaultProps = {
  treeNodeData: [], //tree 数据源
  isTree: true, //是否展示tree组件
  isSearch: false, //是否展示搜索
  isShowNodes: false, //是否展示展开/收起全部
  isDelete: false, //是否可以删除节点
  isCreate: false, //是否可以增加节点
  isEdit: false, //是否可以删除节点
  isUploadFile: 0,
  options: {}, //antd tree 组价本身属性
  changeTreeLoading: () => {}, //是否加载中
}
const mapStateToProps = state => ({
  detailsList: state.tree.detailsList,
})
const mapDispatchToProps = dispatch => ({
  updateTreeNodeData: params => dispatch.tree.updateTreeNodeData(params),
  getNodeIdTree: params => dispatch.tree.getNodeIdTree(params),
  createNodeTree: params => dispatch.tree.createNodeTree(params),
  deleteNodeTree: params => dispatch.tree.deleteNodeTree(params),
  editNodeTree: params => dispatch.tree.editNodeTree(params),
  moveNodeTree: params => dispatch.tree.moveNodeTree(params),
})
export default connect(mapStateToProps, mapDispatchToProps)(TaskTree)
