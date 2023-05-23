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

async function register(){
    const username = document.getElementById("iptUsername").value
    const password = document.getElementById("iptPassword").value
    const confirmPassword = document.getElementById("iptConfirmPassword").value

    if(!username || !password || !confirmPassword || password != confirmPassword){
        alert("Existem valores não congruentes")
    }
    else{
        console.log("opa")
        const res = await fetch("/user/register",{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: {
                username: username,
                password: password
            }
        })
        const data = await res.json()
        console.log(data)
    }
}