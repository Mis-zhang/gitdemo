import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'antd'
import { getAllKeys } from '../../Utils'
const { Text } = Typography

const Expand = props => {
  const { treeData, autoExpand, expandKeys, hideAllNodes } = props
  const [isShow, setIsShow] = useState(false)
  const clickSwitch = () => {
    if (isShow) {
      setIsShow(false)
      autoExpand(true)
      expandKeys(getAllKeys([...treeData], null))
    } else {
      setIsShow(true)
      autoExpand(false)
      hideAllNodes([])
    }
  }
  return (
    <div className="btns">
      <Text className="text" onClick={clickSwitch}>
        展开
      </Text>
      <span>/</span>
      <Text className="text" onClick={clickSwitch}>
        收起全部
      </Text>
    </div>
  )
}
Expand.propTypes = {
  treeData: PropTypes.array,
  autoExpand: PropTypes.func,
  expandKeys: PropTypes.func,
  hideAllNodes: PropTypes.func,
}
Expand.defaultProps = {
  treeData: [],
  autoExpand: () => {},
  expandKeys: () => {},
  hideAllNodes: () => {},
}

export default Expand
