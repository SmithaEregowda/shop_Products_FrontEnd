const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require("http-proxy-middleware")
require('dotenv').config();
const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const server = process.env.SERVER;




const isDevelopment = process.env.NODE_ENV !== 'production'

app.prepare().then(() => {
  const server = express()

  const apiPaths = {
    '/api': {
        target: process.env.SERVER, 
        pathRewrite: {
            '^/api': '/api'
        },
        changeOrigin: true
    }
  }

  //if (isDevelopment) {
    server.use('/api', createProxyMiddleware(apiPaths['/api']));
  //}

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}).catch(err => {
  console.log(`> err${err}`)
})