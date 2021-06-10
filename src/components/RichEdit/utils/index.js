/**
 * 插入文本
 * @param {*} editor 编辑器实例
 * @param {*} text 文本内容
 */
export const insertText = (editor, text) => {
  const range = editor.getSelection()
  const newRange = 0 + (range !== null ? range.index : 0)
  editor.insertText(newRange, text)
  editor.setSelection(1 + newRange)
}

/**
 * 插入媒体
 * @param {*} editor 编辑器实例
 * @param {*} type 类型 image, video
 * @param {*} value url
 */
export const insertEmbed = (editor, type, value) => {
  const range = editor.getSelection()
  const newRange = 0 + (range !== null ? range.index : 0)
  editor.insertEmbed(newRange, type, value)
  editor.setSelection(1 + newRange)
}
