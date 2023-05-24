let formSection = 0

function mude(form){
    const forms = document.getElementById("forms")
    const underline = document.getElementById("underline")
    const option1 = document.getElementById("option1")
    const option2 = document.getElementById("option2")
    
    if(form == formSection){
        if(form == 0){
            forms.scrollTo(700, 0)
            formSection = 1
            underline.classList.add("disappear")
            underline.classList.add("appear")
            option1.children[0].classList.remove("select")
            setTimeout(() => {
                option1.removeChild(option1.children[1])
                option2.innerHTML = `
                    <button class='txtOptions select' onclick='mude(0)'>Cadastrar</button>
                    <div class="divContUnderline">
                        <div class="divUnderline appear" id="underline"></div>
                    </div>
                `
            }, 600)
        }
        else{
            forms.scrollTo(-700, 0)
            formSection = 0
            underline.classList.add("disappear")
            underline.classList.add("appear")
            option2.children[0].classList.remove("select")
            setTimeout(() => {
                option2.removeChild(option2.children[1])
                option1.innerHTML = `
                    <button class='txtOptions select' onclick='mude(1)'>Entrar</button>
                    <div class="divContUnderline">
                        <div class="divUnderline appear" id="underline"></div>
                    </div>
                `
            }, 600)
        }
    }
}

function register(){
    const username = document.getElementById("iptUsername")
    const password = document.getElementById("iptPassword")
    const confirmPassword = document.getElementById("iptConfirmPassword")

    if(!username.value || !password.value || !confirmPassword.value || password.value != confirmPassword.value){
        alert("Existem valores não congruentes")
    }
    else{
        console.log("opa")
        fetch("/user/register",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })
        .then(res => {
            if(res.status == 200){
                mude(1)
                username.value = ""
                password.value = ""
                confirmPassword.value = ""
            } else if(res.status == 403){
                alert("O nome já esta em uso")
            } else {
                alert("Erro")
            }
        })
    }
}
function login(){
    const username = document.getElementById("iptUsernameLogin")
    const password = document.getElementById("iptPasswordLogin")

    if(!username.value || !password.value){
        alert("Existem valores não congruentes")
    }
    else{
        fetch("/user/login",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })
        .then(async res => {
            const id = (await res.json()).msg.idCuber
            if(res.status == 200){
                localStorage.idCuber = id
                window.location.href = "/profile.html"
            } else if(res.status == 403){
                alert("usuário ou senha errada")
            } else{
                alert("Erro")
            }
        })
        
    }
}