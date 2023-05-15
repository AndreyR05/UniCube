function mude(form){
    const forms = document.getElementById("forms")
    const underline = document.getElementById("underline")
    const option1 = document.getElementById("option1")
    const option2 = document.getElementById("option2")
    
    console.log(underline)
    
    if(form == 0){
        forms.scrollTo(620, 0)
        form = 1
        underline.classList.add("disappear")
        setTimeout(() => {
            option1.innerHTML = "<button class='txtOptions' onclick='mude(1)'>Entrar</button>"    
        }, 700)
    }
    else{
        forms.scrollTo(-620, 0)
        form = 0
        option2.innerHTML = "<button class='txtOptions select' onclick='mude(1)'>Entrar</button>"
    }
}