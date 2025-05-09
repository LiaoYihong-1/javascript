document.documentElement.style.height = '100%'
document.body.style.height = '100%'
document.body.style.margin = '0'
document.body.style.backgroundColor = '#f5f5f5'

const appRoot = document.createElement('div')
appRoot.style.maxWidth = '800px'
appRoot.style.margin = '0 auto'
appRoot.style.padding = '20px'
document.body.appendChild(appRoot)

const title = document.createElement('h1')
title.textContent = 'Task management'
title.style.color = '#333'
appRoot.appendChild(title)

const status = document.createElement('div')
status.textContent = 'loaded'
status.style.margin = '10px 0'
appRoot.appendChild(status)

try {
    status.textContent = 'Redux Store'

    const { App } = await import('./components/App.js')
    const app = new App()
    app.mount(appRoot)
} catch (error) {
    status.textContent = `Failed: ${error.message}`
    console.error(error)
}