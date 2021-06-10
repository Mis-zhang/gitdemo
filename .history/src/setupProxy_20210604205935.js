const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function(app) {
  app.use(
    '/service',
    createProxyMiddleware({
      target: 'https://ids-test.kaikeba.com',
      changeOrigin: true,
      pathRewrite: {
        '^/service': '',
      },
      secure: false,
    }),
  )
}
