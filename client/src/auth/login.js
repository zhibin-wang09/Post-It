/*global chrome*/
import React from 'react'
import {useState} from 'react'

function Login(){
    const [status, setStatus] = useState("")
    async function handleSubmit(e){
        console.log("Logging...!")
        e.preventDefault()
        const info = {
            username: e.target.elements.username.value,
            password: e.target.elements.password.value
        }
        try{
            //https://post-it-upgrade.onrender.com/signin
            const res = await fetch("http://localhost:5500/signin",{
                method: 'POST',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(info)
            })
            const resJson = await res.json()
            e.target.reset()
            setStatus(resJson.message)
        }catch(err){
            console.log(err.message)
            setStatus("Loggin in failed" + err.message)
        }
    }

    return (
        <>
            <div id="login">
                <form onSubmit={handleSubmit}>
                    <input className='username-field' name="username" placeholder='username' type='text' required></input>
                    <input className='password-field' name="password" placeholder='password' type='password' required></input>
                    <button type="submit">Login</button>
                </form>
            </div>
            <strong><i>{status}</i></strong>
        </>
    )
}

export default Login