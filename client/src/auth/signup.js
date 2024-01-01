
function Signup(){

    async function handleSubmit(e){
        e.preventDefault()
        const info = {
            username: e.target.elements.username.value,
            password: e.target.elements.password.value,
            email: e.target.elements.email.value
        }
        try{
            //https://post-it-upgrade.onrender.com/signup
            const res = await fetch("http://localhost:5500/signup",{
                method: 'POST',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(info)
            })
            const resJson = await res.json ()
            console.log(resJson)
            
            e.target.reset()
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div id="signup">
            <form onSubmit={handleSubmit}>
                <input className='username-field' name="username" placeholder='username' type='text' required></input>
                <input className ='email-field' name ='email' placeholder='email' type ='text' required></input>
                <input className='password-field' name="password" placeholder='password' type='password' required></input>
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default Signup