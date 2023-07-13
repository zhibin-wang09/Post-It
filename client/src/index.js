import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import './note.css'
import './auth.css'
import App from './app'

import {MemoryRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <MemoryRouter>
            <App/>
        </MemoryRouter>
    </React.StrictMode>
)