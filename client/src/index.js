import React from 'react'
import ReactDOM from 'react-dom/client'

import './stylesheets/index.css'
import './stylesheets/note.css'
import './stylesheets/auth.css'
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