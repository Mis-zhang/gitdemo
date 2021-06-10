import Quill from 'quill'

const BlockItem = Quill.import('blots/block/embed')

export default class SiteBlot extends BlockItem {
  static create(v) {
    let node = super.create()
    node.setAttribute('url', v.url)

    return node
  }

  static value(n) {
    return {
      url: n.getAttribute('url'),
    }
  }
}
SiteBlot.blotName = 'site'
SiteBlot.tagName = 'A'
