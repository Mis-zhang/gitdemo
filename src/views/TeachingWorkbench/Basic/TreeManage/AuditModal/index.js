import React, { Fragment, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Modal, Typography, ConfigProvider, Row, Col, message, Button } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { GmForm, GMFORM_TYPE } from '@kkb/vgeform'
const { Title } = Typography
const AuditModal = props => {
  const { treeId } = props
  const auditRef = useRef(null)
  // modal 配置
  const auditData = [
    {
      type: GMFORM_TYPE.textArea,
      label: '审核备注',
      name: 'approvalDescription',
      className: 'basicBoxWrap',
      options: {
        height: 80,
        tipsFormatter: (count, maxLength) => {
          return `还有${count}个字，最多${maxLength}字数`
        },
      },
      rules: [{ required: true, message: '请填写审核备注' }],
    },
  ]
  const [auditLoading, setauditLoading] = useState(false)
  const handleOk = () => {
    setauditLoading(true)
    const formValues = auditRef.current.validateFields()
    if (formValues.errorFields?.length > 0) {
      return
    }
    formValues
      .then(result => {
        const params = { treeId, ...result }
        props
          .auditTree(params)
          .then(res => {
            props.closeAuditModal('ok')
            setauditLoading(false)
            message.success('审核通过')
          })
          .catch(err => {
            message.error(err.message)
            setauditLoading(false)
          })
      })
      .catch(error => {
        setauditLoading(false)
      })
  }
  const handleCancel = () => {
    props.closeAuditModal()
  }
  const wrapperCol = {
    span: 17,
  }
  const labelCol = {
    span: 4,
  }
  return (
    <Fragment>
      <Modal
        width={620}
        title="审核知识树"
        visible={true}
        destroyOnClose
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk} loading={auditLoading}>
            审核通过
          </Button>,
        ]}
      >
        <Row>
          <Col span={24}>
            <Title level={5} style={{ padding: '0px 0px' }}>
              审核通过后，无法删除知识树内所有知识点，只能新增，是否继续审核？
            </Title>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <ConfigProvider locale={zhCN}>
              <GmForm
                ref={auditRef}
                boxData={auditData}
                saveBtnText={null}
                cancelBtnText={null}
                wrapperCol={wrapperCol}
                labelCol={labelCol}
              />
            </ConfigProvider>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}
const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  auditTree: params => dispatch.tree.auditTree(params),
})
export default connect(mapStateToProps, mapDispatchToProps)(AuditModal)
