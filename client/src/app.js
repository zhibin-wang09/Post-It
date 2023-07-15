import {Link,Routes,Route} from 'react-router-dom'
import React from 'react'
import Login from './auth/login'
import NoteContainer from './note/notecontainer'
import Home from './home'
import Signout from './auth/signout'
import Signup from './auth/signup'

function App(){
    return (
        <>
            <nav id="nav-bar">
                <ul id="nav-bar-items">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to ='/signup'>Signup</Link></li>
                    <li><Link to='/signout'>Signout</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/note'>Notes</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path='/' element= {<Home/>}/>
                <Route path='/login' element= {<Login/>}/>
                <Route path='/note' element ={<NoteContainer/>}/>
                <Route path='/signout' element ={<Signout/>}/>
                <Route path='/signup' element ={<Signup/>}/>
            </Routes>
        </>
    )
}

export default App