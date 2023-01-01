
async function retreive(){
    fetch('http://localhost:5500').then(res => res.text()).then(d => {
        console.log(d)
    })
}

retreive()
