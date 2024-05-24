import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Pages/App/App'
import './index.css'
import * as serviceWorkerRegistration from './ServiceWorker/serviceWorkerRegistration'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

serviceWorkerRegistration.register()
