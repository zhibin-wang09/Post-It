import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import './note.css'
import './auth.css'
import NoteContainer from './note/notecontainer'
import Login from './auth/login'
import App from './app'
import Home from './home'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children : [
            {
                index: true,
                element: <Home/>
            },
            {
                path:'/login',
                element: <Login/>
            },
            {
                path: '/note',
                element: <NoteContainer/>
            },
        ]
        
    },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)