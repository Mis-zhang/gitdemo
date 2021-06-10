import React from 'react'
import PropTypes from 'prop-types'
import { Popconfirm } from 'antd'
import { EditOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { editTreeNode, addTreeNode, delTreeNode } from '../Utils'

const Action = props => {
  const { itemInfo, treeNodeData, isApprovalStatus } = props
  const onEditTreeNode = (key, value, defaultValue) => {
    props.onEditTreeNode({ value, arr: editTreeNode(key, [...treeNodeData]) })
  }
  const onAddTreeNode = key => {
    props.onAddTreeNode({ key, arr: addTreeNode(key, [...treeNodeData]) })
  }
  const onDelTreeNode = (e, id, key) => {
    props.onDelTreeNode({ id, arr: delTreeNode(key, [...treeNodeData]) })
  }
  const cancel = e => {
    console.log(e, 'cancel')
  }
  return (
    <div>
      <div
        className={
          itemInfo.value !== '' && itemInfo.isLeave
            ? 'tree-operation mouse'
            : 'tree-operation leave'
        }
      >
        <span
          className="tree-icon tree-node-edit"
          onClick={() => onEditTreeNode(itemInfo.key, itemInfo.value, itemInfo.defaultValue)}
        >
          <EditOutlined />
        </span>
        {isApprovalStatus !== 1 ? (
          <Popconfirm
            title="是否要删除此知识点吗？"
            onConfirm={e => onDelTreeNode(e, itemInfo.id, itemInfo.key)}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <span className="tree-icon tree-node-del">
              <MinusCircleOutlined />
            </span>
          </Popconfirm>
        ) : (
          <></>
        )}
        <span className="tree-icon tree-node-add" onClick={() => onAddTreeNode(itemInfo.key)}>
          <PlusCircleOutlined />
        </span>
      </div>
    </div>
  )
}
Action.propTypes = {
  treeNodeData: PropTypes.array,
  itemInfo: PropTypes.object,
  isApprovalStatus: PropTypes.number,
  onEditTreeNode: PropTypes.func,
  onAddTreeNode: PropTypes.func,
  onDelTreeNode: PropTypes.func,
}
Action.defaultProps = {
  treeNodeData: [],
  itemInfo: {},
  isApprovalStatus: null,
  onEditTreeNode: () => {},
  onAddTreeNode: () => {},
  onDelTreeNode: () => {},
}

export default Action
