import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Editor as Tinymce } from '@tinymce/tinymce-react'
import MarkdownEditor from 'for-editor'
import { upload } from '../../utils/qiniu'
import './index.css'

class Editor extends Component {
  state = {
    content: '',
  }

  timer = null

  componentDidMount() {
    this.initEdit()
    // this.editor.on('text-change', this.onChange)
  }

  componentWillUnmount() {}

  autoSave = () => {
    clearInterval(this.timer)
    const { autoSaveInterval } = this.props
    this.timer = setInterval(this.saveContent, autoSaveInterval || 3000)
  }

  saveContent = () => {
    const { content } = this.state
    localStorage.setItem('quill-content', content)
  }

  onChange = content => {
    const { onChange } = this.props
    this.setState({ content })
    onChange && onChange(content)
  }

  initEdit = () => {}

  insertContent(content) {
    this.setState({
      content,
    })
    setTimeout(() => {
      this.editor.editor.editorManager.get(this.editor.id).focus()
    }, 500)
  }

  getContent() {
    return this.state.content
  }

  onBlur() {
    const { editorBlur } = this.props
    editorBlur && editorBlur()
  }

  get videoProps() {
    const { videoProps } = this.props
    return {
      videoProps,
      editor: this.editor,
    }
  }

  get imgProps() {
    const { imgProps } = this.props
    return {
      ...imgProps,
      editor: this.editor,
    }
  }

  render() {
    const {
      height,
      isMarkdown,
      toolBar,
      imgProps: { uploadImage },
      fileUpload,
      videoUpload,
      showToolBar,
    } = this.props
    const toolbar =
      toolBar || !isMarkdown
        ? [
            'undo redo styleselect bold italic link image' +
              ' media codesample alignleft aligncenter alignright newdocument' +
              ' inserttable pagebreak nonbreaking anchor toc insertdatetime' +
              ' bold italic underline strikethrough superscript subscript codeformat' +
              ' formats blockformats fontformats fontsizes align forecolor backcolor' +
              ' removeformat spellchecker spellcheckerlanguage code wordcount' +
              ' inserttable cell row column insert table',
          ]
        : {
            h1: true, // h1
            h2: true, // h2
            h3: true, // h3
            h4: true, // h4
            img: true, // 图片
            link: true, // 链接
            code: true, // 代码块
            preview: true, // 预览
            expand: true, // 全屏
            /* v0.0.9 */
            undo: true, // 撤销
            redo: true, // 重做
            save: true, // 保存
            /* v0.2.3 */
            subfield: true, // 单双栏模式
          }
    return (
      <div className="quillEditor" id="tinydemo">
        {!isMarkdown ? (
          <Tinymce
            initialValue=""
            init={{
              height: height || 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table code help wordcount codesample',
              ],
              toolbar: showToolBar ? toolbar : false,
              inline: false,
              language: 'zh_CN',
              // quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote'
              automatic_uploads: true,
              file_picker_types: 'file media',
              images_upload_url: '/',
              images_upload_base_path: '/img',
              images_upload_handler: (blobInfo, success) => {
                uploadImage&&uploadImage(blobInfo, success)
              },
              file_picker_callback: (callback, value, meta) => {
                // Provide file and text for the link dialog
                if (meta.filetype === 'file') {
                  // callback('mypage.html', {text: 'My text'});
                  fileUpload && fileUpload(callback)
                }
                // Provide alternative source and posted for the media dialog
                if (meta.filetype === 'media') {
                  // callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
                  videoUpload && videoUpload(callback)
                }
              },
              forced_root_block: '',
              extended_valid_elements:
                'file[id|name|type|url],site[id|name|type|url],data-miniprogram[appid|name|href|title|path]',
            }}
            extended_valid_elements={true}
            paste_webkit_styles={true}
            paste_remove_styles_if_webkit={false}
            value={this.state.content}
            onEditorChange={value => this.onChange(value)}
            tinymceScriptSrc="/tinymce/js/tinymce/tinymce.min.js"
            onBlur={this.onBlur.bind(this)}
            ref={ref => {
              this.editor = ref
            }}
          />
        ) : (
          <MarkdownEditor
            value={this.state.content}
            onChange={this.onChange.bind(this)}
            height={500}
            toolbar={toolbar}
          />
        )}
      </div>
    )
  }
}

Editor.propTypes = {
  initialContent: PropTypes.string,
  autoSaveInterval: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  uploadUrl: PropTypes.string,
  editorId: PropTypes.string,
}

Editor.defaultProps = {
  editorId: 'customEditor',
  showTools: true,
}

export default Editor
