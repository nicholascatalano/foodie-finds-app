document.querySelector("#signup").addEventListener("submit",event=>{
    event.preventDefault();
    const userObj = {
        username:document.querySelector("#username").value,
        email:document.querySelector("#email").value,
        password:document.querySelector("#password").value,
    }
    
    fetch("/api/users/",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            console.log("Signed up successfully")
            location.href="/dashboard"
        } else {
            alert("Try again!")
        }
    })
})