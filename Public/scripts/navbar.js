function Options(){
    const dropdown = document.getElementById("dropdown")
    dropdown.style.display = "flex"
}

function navigate(idCuber){
    if(!idCuber){
        const idUser = localStorage.idCuber
        localStorage.navigateId = idUser
    }
    else{
        localStorage.navigateId = idCuber
    }
    window.location.href = "/profile.html" 
}
function exitToAccount(){
    localStorage.clear()
    window.location.href = "/" 
}