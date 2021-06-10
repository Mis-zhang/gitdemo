import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Card, message, Spin } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import Descriptions from './Descriptions'
import UploadFile from './UploadFile'
import Tree from '@/components/Tree'

const TreeEdit = props => {
  const { id } = props.match.params
  const [treeLoading, setTreeLoading] = useState(false)
  useEffect(() => {
    props.detailsTree(id)
    // eslint-disable-next-line
  }, [])
  // 获取上传文件状态
  const onChangeUploadFile = () => {
    props.getNodeIdTree(props.detailsList.rootNodeId)
  }
  const [isEdit, setIsEdit] = useState(false)
  const onPressEnter = ({ params, status }) => {
    props
      .editTree(params)
      .then(res => {
        message.success('修改知识树名称成功')
        props.detailsTree(id)
        setIsEdit(status)
      })
      .catch(err => {
        message.error(err.message)
      })
  }
  const onBlur = ({ params, status, value }) => {
    props
      .editTree(params)
      .then(res => {
        message.success('修改知识树名称成功')
        props.detailsTree(id)
        setIsEdit(status)
      })
      .catch(err => {
        message.error(err.message)
      })
  }
  const clickEditStatus = status => {
    setIsEdit(status)
  }
  const changeTreeLoading = status => {
    setTreeLoading(status)
  }
  const goBack = () => {
    props.history.goBack(-1)
  }
  const [isUploadFile, setIsUploadFile] = useState(0)
  const uploadFileStatus = status => {
    setIsUploadFile(status)
  }
  return (
    <Fragment>
      <div style={{ padding: '24px 32px' }}>
        <Descriptions
          detailsList={props.detailsList}
          defaultEditValue={props.detailsList.name}
          deafultIsEdit={isEdit}
          onPressEnter={onPressEnter}
          onBlur={onBlur}
          clickEditStatus={clickEditStatus}
        />
        <UploadFile
          approvalStatus={props.detailsList.approvalStatus}
          rootNodeId={props.detailsList.rootNodeId}
          uploadFileStatus={uploadFileStatus}
          onChangeUploadFile={onChangeUploadFile}
        />
        <Card>
          <Spin spinning={treeLoading}>
            <Tree
              isTree={props.isTree}
              isApprovalStatus={props.detailsList.approvalStatus}
              isUploadFile={isUploadFile}
              changeTreeLoading={changeTreeLoading}
              treeNodeData={props.treeNodeData}
            />
          </Spin>
        </Card>
        <div style={positionStyle}>
          <Button type="primary" shape="round" icon={<ArrowLeftOutlined />} onClick={goBack}>
            返回
          </Button>
        </div>
      </div>
    </Fragment>
  )
}
const positionStyle = {
  position: 'fixed',
  right: '40px',
  bottom: '20px',
}
const mapStateToProps = state => ({
  detailsList: state.tree.detailsList,
  treeNodeData: state.tree.treeNodeData,
  isTree: state.tree.isTree,
})
const mapDispatchToProps = dispatch => ({
  detailsTree: params => dispatch.tree.detailsTree(params),
  editTree: params => dispatch.tree.editTree(params),
  getNodeIdTree: params => dispatch.tree.getNodeIdTree(params),
})
export default connect(mapStateToProps, mapDispatchToProps)(TreeEdit)
