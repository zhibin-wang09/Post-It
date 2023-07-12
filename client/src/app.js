import {Link, Outlet} from 'react-router-dom'
import React from 'react'

function App(){
    return (
        <>
            <nav id="nav-bar">
                <ul id="nav-bar-items">
                    <li id><Link to='/'>Home</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/note'>Notes</Link></li>
                </ul>
            </nav>
            <div>
                <Outlet/>
            </div>
        </>
    )
}

export default App