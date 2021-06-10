import React, { Component } from 'react'
import { insertEmbed } from '../../utils'
import { upload } from '../../../../utils/qiniu'

export default class Image extends Component {
  handleImage = e => {
    e.preventDefault()
    this.uploadFile.click()
  }

  handleUpload = async e => {
    const file = e.target.files[0]
    const { token, editor } = this.props
    if (!token || !file) {
      return
    }
    const cb = imageUrl => {
      insertEmbed(editor, 'image', imageUrl)
    }
    upload(file, token, null, cb)
  }

  render() {
    return (
      <>
        <button onClick={this.handleImage}>
          <svg viewBox="0 0 18 18">
            <rect
              className="ql-stroke"
              height="10"
              width="12"
              x="3"
              y="4"
            ></rect>
            <circle className="ql-fill" cx="6" cy="7" r="1"></circle>
            <polyline
              className="ql-even ql-fill"
              points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"
            ></polyline>
          </svg>
        </button>
        <input
          ref={uploadFile => (this.uploadFile = uploadFile)}
          type="file"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={this.handleUpload}
        />
      </>
    )
  }
}

Image.defaultProps = {
  uploadUrl: 'https://apitool.kaikeba.com/v1/helper/upload/web',
}
