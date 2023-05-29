let user

window.onload = () => {
    const idCuber = localStorage.idCuber

    if(!idCuber){
        window.location.href = "/register.html"
    }
    else{
        const userImg = document.getElementById("divUserImg")
        userImg.href = "profile.html"
        renderUser(idCuber)
    }
}

async function renderUser(idCuber){
    const username = document.getElementById("username")
    const followers = document.getElementById("qtdFollowers")
    const following = document.getElementById("qtdFollowing")
    const publication = document.getElementById("qtdPublications")
    const countItems = document.getElementById("txtCountItems")
    const itemsUser = document.getElementById("divItemsCollection")
    const divPublications = document.getElementById("divPublications")
    const divCubes = document.getElementById("divCubes")

    divPublications.innerHTML = ""
    divCubes.innerHTML = ""
    itemsUser.innerHTML = ""

    const res = await fetch(`/user/${idCuber}`)
    user = await res.json()

    username.innerHTML = user.nameCuber
    followers.innerHTML = user.followersCuber
    following.innerHTML = user.followingCuber
    publication.innerHTML = user.publicationsCuber
    countItems.innerHTML = user.cubesCuber
    for(let i = 0; i < 3; i++){
        itemsUser.innerHTML +=`<div class="divCollectionItem">
            <img src="../assets/imgs/octahedron.png" alt="">
        </div>`
    }

    const rows = user.publications.length / 5
    for(let i = 0; i < rows; i++){
        let numCards = 5
        if(i >= rows-1){
            numCards = user.publications.length % 5 ? user.publications.length % 5 : 5
        }

        const divRow = document.createElement("div")
        divRow.classList.add("divRowCards")

        for(let j = 0; j < numCards; j++){
            divRow.innerHTML += `
                <div class="divCard">
                    <img class="imgCover" src="../assets/imgs/octahedron.png">
                    <div class="divContentCard">
                        <p class="txtTitleContent">${user.publications[i*5+j].titlePublication}</p>
                        <div class="divRowData">
                            <div class="divPostLikes">
                                <img src="../assets/icons/heartIconOutline.png">
                                <p>${user.publications[i*5+j].likes}</p>
                            </div>

                            <button class="btnPostEdit" onclick="showEdit(${i*5+j})">
                                <img src="../assets/icons/updateIcon.png">
                                <p>Editar</p>
                            </button>
                        </div>
                    </div>
                </div>
            `
        }
        divPublications.appendChild(divRow)
    }
    const rowsCubs = (user.cubes.length + 1) / 4
    for(let i = 0; i < rowsCubs; i++){
        let numCards = 4
        if(i >= rowsCubs-1 && (user.cubes.length+1) % 4 != 0){
            numCards = (user.cubes.length+1) % 4
        }

        const divRow = document.createElement("div")
        divRow.classList.add("divRowCards")

        for(let j = 0; j < numCards; j++){
            if(i*4+j != user.cubes.length){
                const rarity = 
                    user.cubes[i*4+j].rarity == "Muito Raro" ? 4
                    : user.cubes[i*4+j].rarity == "Raro" ? 3
                    : user.cubes[i*4+j].rarity == "Pouco Comum" ? 2
                    : 1

                divRow.innerHTML += `
                    <div class="divCollectionContentItems">
                        <button class="btnEdit" onclick="showEditCube()">
                            <img src="assets/icons/dotsIcon.png">
                        </button>
                        <img src="assets/imgs/octahedron.png" alt="">
                        <div class="itemInfo">
                            <p class="txtNameItem">${user.cubes[i*4+j].nameCube}</p>
                            <img class="rarity" src="assets/icons/rarity${rarity}.png" title="${user.cubes[i*4+j].rarity}">
                        </div>
                    </div>
                `
            }
            else{
                divRow.innerHTML += `
                <button class="divCollectionContentItems" onclick="showModalCube()">
                    <img class="imgNewCube" src="assets/icons/plusIcon.png">
                    <p class="txtNewCube">Novo cubo</p>
                </button>
        
                `
            }
        }
        divCubes.appendChild(divRow)
    }
}
function showEditCube(){
    const modal = document.getElementById("modalEditCube")
    modal.style.display = "flex"
}

function closeEditCube(){
    const modal = document.getElementById("modalEditCube")
    modal.style.display = "none"
}

function showModalCube(){
    const modal = document.getElementById("modalAddCube")
    modal.style.display = "flex"
}
function closeModalCube(){
    const modal = document.getElementById("modalAddCube")
    modal.style.display = "none"
}
function createCube(){
    const { idCuber } = localStorage

    const name = document.getElementById("iptName")
    const rarity = document.getElementById("iptRarity")

    if(!name.value || !rarity.value){
        alert("Campos não preenchidos")
    }
    else{
        fetch(`/cubes/create/${idCuber}`,{
            method: "POST",
            headers: {
                "Content-Type":'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                rarity: rarity.value
            })
        })
        .then(res => {
            if(res.status == 200){
                name.value = ""
                rarity.value = ""
                renderUser(idCuber)
                closeModalCube()
                changeScreen(1)
            }
        })
    }
}

function showModal(){
    const modal = document.getElementById("modalCreate")
    modal.style.display = "flex"
}
function closeModal(){
    const modal = document.getElementById("modalCreate")
    modal.style.display = "none"
}

function createPublication(){
    const idCuber = localStorage.idCuber

    const title = document.getElementById("iptTitle")
    const desc = document.getElementById("iptDesc")

    fetch(`/publication/create/${idCuber}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title.value,
            desc: desc.value
        })
    })
    .then(() => {
        title.value = ""
        desc.value = ""
        renderUser(idCuber)
        closeModal()
    })
}

function showEdit(indexPublication){
    const title = document.getElementById("iptTitleUpdate")
    const desc = document.getElementById("iptDescUpdate")
    const btnUpdate = document.getElementById("btnUpdate")
    const btnDelete = document.getElementById("btnDelete")

    const modal = document.getElementById("modalUpdate")
    const publication = user.publications[indexPublication]

    title.value = publication.titlePublication
    desc.value = publication.contentPublication
    btnUpdate.onclick = () => updatePublication(indexPublication)
    btnDelete.onclick = () => deletePublication(indexPublication)

    modal.style.display = "flex"
}
function closeEdit(){
    const modal = document.getElementById("modalUpdate")
    modal.style.display = 'none'
}

function updatePublication(indexPublication){
    const idCuber = localStorage.idCuber

    const title = document.getElementById("iptTitleUpdate")
    const desc = document.getElementById("iptDescUpdate")

    const publication = user.publications[indexPublication]

    fetch(`/publication/update/${publication.idPublication}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title.value,
            desc: desc.value
        })
    })
    .then((res) => {
        title.value = ""
        desc.value = ""
        renderUser(idCuber)
        closeEdit()
    })
}
function deletePublication(indexPublication){
    const { idCuber } = localStorage
    const publication = user.publications[indexPublication]

    fetch(`/publication/delete/${publication.idPublication}`,{
        method: 'DELETE'
    })
    .then((res) => {
        renderUser(idCuber)
        closeEdit()
    })   
}

let contentSection = 0

function changeScreen(form){
    const contentUser = document.getElementById("contentUser")
    const underline = document.getElementById("underline")
    const option1 = document.getElementById("option1")
    const option2 = document.getElementById("option2")
    
    if(form == contentSection){
        if(form == 0){
            contentUser.scrollTo(contentUser.offsetWidth+30, 0)
            contentSection = 1
            underline.classList.add("disappear")
            underline.classList.add("appear")
            option1.children[0].classList.remove("select")
            setTimeout(() => {
                option1.removeChild(option1.children[1])
                option2.innerHTML = `
                    <button class="txtOptionsTitle select" onclick="changeScreen(0)">Coleção</button>
                    <div class="divContUnderline">
                        <div class="divUnderline appear" id="underline"></div>
                    </div>
                `
            }, 600)
        }
        else{
            contentUser.scrollTo(-(contentUser.offsetWidth+30), 0)
            contentSection = 0
            underline.classList.add("disappear")
            underline.classList.add("appear")
            option2.children[0].classList.remove("select")
            setTimeout(() => {
                option2.removeChild(option2.children[1])
                option1.innerHTML = `
                    <button class="txtOptionsTitle select" onclick="changeScreen(1)">Publicações</button>
                    <div class="divContUnderline">
                        <div class="divUnderline appear" id="underline"></div>
                    </div>
                `
            }, 600)
        }
    }
}