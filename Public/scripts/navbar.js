window.onload = () => {
    const { idCuber } = localStorage

    if(idCuber){
        const userImg = document.getElementById("divUserImg")
        userImg.href = "profile.html"
    }
}