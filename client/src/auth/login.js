/*global chrome*/
import React from 'react'

function Login(){

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
                url: "https://post-it-upgrade.onrender.com/signin",
                name: "access-token",
                value: resJson.accesstoken,
                httpOnly: true,
                sameSite: "no_restriction",
                secure: true,
                expirationDate: 60 * 60 * 24 * 30 * 1000
            });
              
            chrome.cookies.set({
                url: "https://post-it-upgrade.onrender.com/signin",
                name: "identifierToken",
                value: resJson.identifierToken,
                httpOnly: true,
                sameSite: "no_restriction",
                secure: true,
                expirationDate: 60 * 60 * 24 * 30 * 1000
            });
            e.target.reset()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div id="login">
            <form onSubmit={handleSubmit}>
                <input className='username-field' name="username" placeholder='username' type='text' required></input>
                <input className='password-field' name="password" placeholder='password' type='password' required></input>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login