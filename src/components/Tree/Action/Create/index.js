import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'

const Create = props => {
  const { itemInfo } = props

  const onBlurCreate = (event, key) => {
    const { value } = event.target
    props.createActions({ value, key, type: 'blur' })
  }
  const onPressEnterCreate = (event, key) => {
    const { value } = event.target
    props.createActions({ value, key, type: 'enter' })
  }
  return (
    <Fragment>
      {itemInfo.value !== '' ? (
        <span className="tree-title">{itemInfo.value}</span>
      ) : (
        <Input
          style={{ width: '320px' }}
          placeholder="请输入"
          size="small"
          autoFocus
          maxLength={20}
          onPressEnter={event => onPressEnterCreate(event, itemInfo.key)}
          onBlur={event => onBlurCreate(event, itemInfo.key)}
        />
      )}
    </Fragment>
  )
}
Create.propTypes = {
  treeNodeData: PropTypes.array,
  itemInfo: PropTypes.object,
  onPressEnterCreate: PropTypes.func,
  onBlurCreate: PropTypes.func,
  createActions: PropTypes.func,
}
Create.defaultProps = {
  treeNodeData: [],
  itemInfo: {},
  onPressEnterCreate: () => {},
  onBlurCreate: () => {},
  createActions: () => {},
}

export default Create
