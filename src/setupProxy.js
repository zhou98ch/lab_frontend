const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://129.69.209.197:31002',    //要访问的地址
            changeOrigin: true,
            pathRewrite:{'^/api':''} //重写请求路径(必须)
         
        })
    );
   
};

