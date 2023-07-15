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
            const res = await fetch("https://post-it-upgrade.onrender.com/signin",{
                method: 'POST',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(info)
            })
            const resJson = await res.json ()
            //console.log(resJson)
            // chrome.storage.local.set({ "access-token": resJson.accesstoken }, function () {
            //     if (chrome.runtime.lastError) {
            //     console.error(chrome.runtime.lastError);
            //     } else {
            //     console.log("resJson stored successfully");
            //     }
            // });
            // chrome.storage.local.set({ "identifierToken": resJson.identifierToken }, function () {
            //     if (chrome.runtime.lastError) {
            //     console.error(chrome.runtime.lastError);
            //     } else {
            //     console.log("resJson stored successfully");
            //     }
            // });
            chrome.cookies.set({
                url: "http://localhost:3000/",
                name: "access-token",
                value: resJson.accesstoken,
                httpOnly: true,
                sameSite: "no_restriction",
                secure: true,
                expirationDate: 60 * 60 * 24 * 30 * 1000
            });
              
            chrome.cookies.set({
                url: "http://localhost:3000/",
                name: "identifierToken",
                value: resJson.identifierToken,
                httpOnly: true,
                sameSite: "no_restriction",
                secure: true,
                expirationDate: 60 * 60 * 24 * 30 * 1000
            });
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