import React from 'react'
import { Button } from 'antd'
import { createFirstNode } from '../../Utils'
const CreateFirst = props => {
  const { treeNodeData } = props
  const createFirst = () => {
    props.createFirst(createFirstNode([...treeNodeData]))
  }
  return (
    <div>
      <Button type="text" style={{ color: '#1890ff' }} onClick={createFirst}>
        添加
      </Button>
    </div>
  )
}

export default CreateFirst
