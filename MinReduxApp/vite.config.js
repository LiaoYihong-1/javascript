import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        {
            name: 'pure-js-html-fallback',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    if (req.url === '/' || req.url === '/about') {
                        res.setHeader('Content-Type', 'text/html')
                        res.end(`
              <!DOCTYPE html>
              <html>
                <head>
                  <title>MiniReduxApp</title>
                </head>
                <body>
                  <script type="module" src="/src/index.js"></script>
                </body>
              </html>
            `)
                        return
                    }
                    next()
                })
            }
        }
    ]
})