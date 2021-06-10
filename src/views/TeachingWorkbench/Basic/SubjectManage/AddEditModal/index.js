import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { Modal, Row, Col, message } from 'antd'
import { GmForm, GMFORM_TYPE } from '@kkb/vgeform'
import { throttle } from 'lodash'
import styles from './index.module.styl'

const AddEdit = props => {
  const [boxData, setBoxData] = useState([])
  const [title, setTitle] = useState('新建')
  const gmFormRef = useRef(null)

  const handleOk = throttle(async () => {
    const formValues = await gmFormRef.current.validateFields()
    // 验证表单未通过
    if (formValues.errorFields?.length > 0) {
      return
    }
    props
      .addEditSubject({ ...formValues, id: props.modalData?.id })
      .then(() => {
        if (props.modalData?.id) {
          message.success('修改成功')
          props.closeModal('edit')
        } else {
          message.success('添加成功')
          props.closeModal('add')
        }
      })
      .catch(err => {
        message.error(err.data.messages)
      })
  }, 1000)
  // 取消
  const handleCancel = () => {
    props.closeModal()
  }
  const initVgeForm = async () => {
    const boxDataType = [
      {
        type: GMFORM_TYPE.input,
        label: '科目名称',
        name: 'name',
        rules: [{ required: true, message: '请输入科目名称' }],
        options: {
          placeholder: '请输入科目名称',
          maxLength: 20,
        },
      },
    ]
    setBoxData(boxDataType)
  }
  useEffect(() => {
    initVgeForm()
    if (props.modalData?.id) {
      setTitle('编辑')
      // 获取信息
      props.getSubjectInfo({ id: props.modalData?.id }).then(res => {
        gmFormRef.current.setValue({ name: res.data.name })
      })
    }
    // eslint-disable-next-line
  }, [])
  return (
    <Modal
      className={styles.modalWarp}
      title={title}
      visible={true}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText="取消"
      confirmLoading={!!props.loading.modalloading}
      destroyOnClose
    >
      {props.modalData?.id && (
        <Row className={styles.rowWarp}>
          <Col span={4} className={styles.labelWarp}>
            项目ID：
          </Col>
          <Col span={24} className={styles.valueWarp}>
            {props.modalData?.id}
          </Col>
        </Row>
      )}
      <GmForm
        ref={gmFormRef}
        boxData={boxData}
        saveBtnText={null}
        cancelBtnText={null}
        className={styles.formWarp}
      />
    </Modal>
  )
}
AddEdit.defaultProps = {
  modalData: '',
}

const mapStateToProps = state => ({
  loading: {
    modalloading: state.loading.effects.subject.addEditSubject,
  },
})

const mapDispatchToProps = dispatch => ({
  addEditSubject: params => dispatch.subject.addEditSubject(params),
  getSubjectInfo: params => dispatch.subject.getSubjectInfo(params),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit)
