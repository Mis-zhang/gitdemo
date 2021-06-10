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
      .addEditProject({ ...formValues, id: props.modalData?.id })
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
        type: GMFORM_TYPE.select,
        label: '项目分类',
        name: 'categoryId',
        data: props.projectTypaArr,
        options: {
          placeholder: '请选择项目分类',
        },
        rules: [{ required: true, message: '请选择项目分类' }],
      },
      {
        type: GMFORM_TYPE.input,
        label: '项目名称',
        name: 'name',
        rules: [{ required: true, message: '请输入项目名称' }],
        options: {
          placeholder: '请输入项目名称',
          maxLength: 20,
        },
      },
      {
        type: GMFORM_TYPE.checkbox,
        label: '关联科目',
        name: 'subjectIds',
        data: props.allSubjectArr,
        options: {
          direction: 'column', // row: 水平 column: 垂直
          allBtn: false,
        },
        rules: [{ required: true, message: '请选择关联科目' }],
      },
    ]
    setBoxData(boxDataType)
  }
  useEffect(() => {
    if (props.isShow) {
      initVgeForm()
      if (props.modalData?.id) {
        setTitle('编辑')
        // 获取信息
        props.getProjectInfo({ id: props.modalData?.id }).then(res => {
          let subjectsArr = []
          res.data.subjects.forEach(item => {
            subjectsArr.push(item.id)
          })
          let formData = {
            id: res.data.id,
            name: res.data.name,
            categoryId: res.data.categoryId,
            subjectIds: subjectsArr,
          }
          gmFormRef.current.setValue(formData)
          initVgeForm() // 编辑回显对象类型数据视图无法跟新，需要重新更新表单视图
        })
      }
    }
    // eslint-disable-next-line
  }, [props.isShow])
  return (
    <Modal
      className={styles.modalWarp}
      title={title}
      visible={props.isShow}
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
    modalloading: state.loading.effects.project.addEditProject,
  },
  projectTypaArr: state.project.projectTypaArr,
  allSubjectArr: state.project.allSubjectArr,
})

const mapDispatchToProps = dispatch => ({
  addEditProject: params => dispatch.project.addEditProject(params),
  getProjectInfo: params => dispatch.project.getProjectInfo(params),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit)
