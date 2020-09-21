const { createServer } = require('http')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const LaunchDarkly = require('launchdarkly-node-server-sdk');

var ld = LaunchDarkly.init(process.env.LD_TEST_SDK_KEY)

app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = new URL(req.url, 'http://w.w')
      const { pathname, query } = parsedUrl
  
      if (pathname === '/') {
        app.render(req, res, '/index', query)
      } else if (pathname === '/signup') {
        app.render(req, res, '/signup', query)
      } else {
        handle(req, res, parsedUrl)
      }
    })
    
ld.on("ready", ()=>{
    app.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      })
  })  
})


// app.prepare().then(() => {
//   createServer((req, res) => {
//     const parsedUrl = new URL(req.url, 'http://w.w')
//     const { pathname, query } = parsedUrl

//     if (pathname === '/') {
//       app.render(req, res, '/index', query)
//     } else if (pathname === '/signup') {
//       app.render(req, res, '/signup', query)
//     } else {
//       handle(req, res, parsedUrl)
//     }
//   }).listen(port, (err) => {
//     if (err) throw err
//     console.log(`> Ready on http://localhost:${port}`)
//   })
// })

process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Process terminated')
    })
})

