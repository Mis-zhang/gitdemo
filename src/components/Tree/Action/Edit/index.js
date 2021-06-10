import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'

const Edit = props => {
  const { treeNodeData, itemInfo, defaultEditValue } = props
  /**
   * 编辑节点
   */
  const [editValue, setEditValue] = useState(defaultEditValue)
  const onChangeEdit = (e, key) => {
    setEditValue(e.target.value)
  }
  const onBlurEdit = (event, nodeId, oldValue) => {
    const { value } = event.target
    // setEditValue('')
    props.editActions({ value, nodeId, oldValue, arr: editNodeValue([...treeNodeData]) })
  }
  const editNodeValue = data =>
    data.map(item => {
      if (item.isEdit) {
        item.isEdit = false
      }
      if (item.children && item.children.length > 0) {
        editNodeValue(item.children)
      }
      return item
    })
  const onPressEnterEdit = (event, nodeId, oldValue) => {
    const { value } = event.target
    // setEditValue('')
    props.editActions({ value, nodeId, oldValue, arr: editNodeValue([...treeNodeData]) })
  }
  return (
    <div className="tree-edit">
      <Input
        style={{ width: '320px' }}
        placeholder="请输入"
        size="small"
        autoFocus
        maxLength={20}
        value={editValue}
        onPressEnter={e => onPressEnterEdit(e, itemInfo.id, itemInfo.value)}
        onChange={e => onChangeEdit(e, itemInfo.key)}
        onBlur={e => onBlurEdit(e, itemInfo.id, itemInfo.value)}
      />
    </div>
  )
}
Edit.propTypes = {
  treeNodeData: PropTypes.array,
  itemInfo: PropTypes.object,
  defaultEditValue: PropTypes.string,
  onBlurEdit: PropTypes.func,
  onPressEnterEdit: PropTypes.func,
  editActions: PropTypes.func,
}
Edit.defaultProps = {
  treeNodeData: [],
  itemInfo: {},
  defaultEditValue: '',
  onBlurEdit: () => {},
  onPressEnterEdit: () => {},
  editActions: () => {},
}

export default Edit
