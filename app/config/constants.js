// --- 业务配置

'use strict'

const constants = {
  // isDev: localStorage.debug,
  // isAPP: parseHashParam('app_version') ? true : false,
  // isPayShow: parseHashParam('isPayShow'),
  app(get) {
    let debug = this.isDev
    switch (get) {
      case 'API':
        let api = {
          'debug': '/mock/23',
          'online': '//zero-blog.com'
        }
        if (debug) {
          return api.debug
        } else {
          return api.online
        }
        break
      default:
        console.warn('缺少参数')
        break
    }
  }
}

export default constants
