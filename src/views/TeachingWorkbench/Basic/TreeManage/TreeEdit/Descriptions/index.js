import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import { EditTwoTone } from '@ant-design/icons'
const Descriptions = props => {
  const { deafultIsEdit, detailsList, defaultEditValue } = props
  const [editValue, setEditValue] = useState('')
  const onChange = e => {
    setEditValue(e.target.value)
  }
  const onPressEnter = event => {
    const { value } = event.target
    const { id, projectId, subjectId, name } = detailsList
    const params = { id, name: value, projectId, subjectId }
    if (value !== name) {
      props.onPressEnter({ params, status: false })
    } else {
      setEditValue('')
      props.clickEditStatus(false)
    }
  }
  const onBlur = event => {
    const { value } = event.target
    const { id, projectId, subjectId, name } = detailsList
    const params = { id, name: value, projectId, subjectId }
    if (value !== name) {
      props.onBlur({ params, status: false })
    } else {
      setEditValue('')
      props.clickEditStatus(false)
    }
  }
  const clickEditStatus = () => {
    setEditValue(defaultEditValue)
    props.clickEditStatus(true)
  }
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ wdith: '100%', display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '40px',
            padding: '10px 0px',
          }}
        >
          <span style={{ width: '90px' }}>知识树名称：</span>
          {deafultIsEdit ? (
            <Input
              style={{ width: '320px' }}
              size="small"
              placeholder="请输入知识树名称"
              autoFocus
              maxLength={20}
              value={editValue}
              onChange={onChange}
              onPressEnter={onPressEnter}
              onBlur={onBlur}
            />
          ) : (
            <Fragment>
              <span>{detailsList.name}</span>
              <span style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={clickEditStatus}>
                <EditTwoTone />
              </span>
            </Fragment>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '40px',
            padding: '10px 0px',
          }}
        >
          <span>项目：</span>
          <span>{detailsList.projectName}</span>
        </div>
        <div
          style={{ display: 'flex', alignItems: 'center', marginRight: '0px', paddingTop: '10px' }}
        >
          <span>科目：</span>
          <span>{detailsList.subjectName}</span>
        </div>
      </div>
    </div>
  )
}
Descriptions.propTypes = {
  detailsList: PropTypes.object,
  defaultEditValue: PropTypes.string,
  deafultIsEdit: PropTypes.bool,
  onPressEnter: PropTypes.func,
  onBlur: PropTypes.func,
  clickEditStatus: PropTypes.func,
}
Descriptions.defaultProps = {
  detailsList: {},
  defaultEditValue: '',
  deafultIsEdit: false,
  onPressEnter: () => {},
  onBlur: () => {},
  clickEditStatus: () => {},
}

export default Descriptions
