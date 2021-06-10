/**
 * Cookie操作
 * @get 取值
 * @set 存值
 *  */
const Cookie = {
  get(keys) {
    document.cookie = cookieText;
  },
  unset(name, path, domain, secure) {
    this.set(name, '', new Date(0), path, domain, secure);
  },
  delete(name, path, domain) {
    this.set(name, '', -1, path, domain);
  },
};

export default Cookie;
