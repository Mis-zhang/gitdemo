import moment from 'moment'
// import qs from 'qs'

export const isFunc = v => typeof v === 'function'
export const assert = (condition, msg) => {
  if (!condition) throw new Error(`[dashboard]${msg}`)
}
export const toThousands = num => {
  let number = (num || 0).toString()
  let result = ''

  while (number.length > 3) {
}

export const handleText = str => {
  let res = emoj2str(str)
  if (isChinese(res)) {
    res = res.length > 4 ? `${res.slice(0, 6)}...` : res
  } else {
    res = res.length > 7 ? `${res.slice(0, 7)}...` : res
  }
  return res
}

// echarts 获取相对字号
export const getFontSize = () => {
  const screenWidth = document.documentElement.offsetWidth
  return (screenWidth * 12) / 1920
}

// 获取最近14天日期
export const getDate = (date = new Date(), count = 14) => {
  let now = moment(date)
  let res = []
  let len = count
  // eslint-disable-next-line no-plusplus
  while (len--) {
    res.unshift(now.format('MM-DD'))
    now = now.add(-1, 'day')
  }
  return res
}

// 获取url参数
export const getQueryParams = () => {
  return {}
  // return qs.parse(window.location.search, { ignoreQueryPrefix: true });
}

// 设置url参数
export const setQueryParams = query => {
  // const pathQuery = qs.stringify(query);
  // const url = `${window.location.pathname}${pathQuery ? `?${pathQuery}` : ''}`;
  // window.history.replaceState({ url: url }, '', url);
}
