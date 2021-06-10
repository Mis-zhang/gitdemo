import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Form, Switch } from 'antd'

const DraggableSwitch = props => {
  const [isChecked, setIsChecked] = useState(false)
  const changeSwitch = e => {
    setIsChecked(e)
    props.changeDraggable(e)
  }
  return (
    <Row style={{ marginBottom: '10px' }}>
      <Col>
        <Form name="basicSwitch">
          <Form.Item label="是否拖拽" name="username" style={{ marginBottom: '0px' }}>
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              checked={isChecked}
              onChange={changeSwitch}
            />
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
DraggableSwitch.propTypes = {
  changeDraggable: PropTypes.func,
}
DraggableSwitch.defaultProps = {
  changeDraggable: () => {},
}

export default DraggableSwitch
