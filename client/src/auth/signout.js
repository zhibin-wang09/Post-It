import React from 'react'

function Signout(){
    
    async function handleSubmit(e){
        e.preventDefault()
        try{
            const res = await fetch("https://post-it-upgrade.onrender.com/signout",{
                method: 'POST',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
                },
            })
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <button type = "submit">Sign out</button>
        </form>
    )
}

export default Signout