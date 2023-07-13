import {Link,Routes,Route} from 'react-router-dom'
import React from 'react'
import Login from './auth/login'
import NoteContainer from './note/notecontainer'
import Home from './home'

function App(){
    return (
        <>
            <nav id="nav-bar">
                <ul id="nav-bar-items">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/note'>Notes</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path='/' element= {<Home/>}/>
                <Route path='/login' element= {<Login/>}/>
                <Route path='/note' element ={<NoteContainer/>}/>
            </Routes>
        </>
    )
}

export default App