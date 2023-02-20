console.log("running")

fetch('http://localhost:3000')
.then(r=>r.json())
.then(console.log)

const login = document.getElementById('login')
const logout = document.getElementById('logout')

login.addEventListener('click', async () =>{
    try{
        const res = await fetch('http://localhost:3000/login')
        const data = await res.json()
        console.log(data)
        login.disabled = true
        logout.disabled = false
    }catch(error){
        console.error(error)
    }
})

logout.addEventListener('click', async ()=>{
   try{
    const res = await fetch('http://localhost:3000/logout')
    const data = await res.json()
    console.log(data)
    logout.disabled=true
    login.disabled = false
   } catch(error){
    console.error(error)
   }
    
})