let user

window.onload = () => {
    const idCuber = localStorage.idCuber

    if(!idCuber){
        window.location.href = "/register.html"
    }
    else{
        renderUser(idCuber)
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

async function renderUser(idCuber){
    const username = document.getElementById("username")
    const followers = document.getElementById("qtdFollowers")
    const following = document.getElementById("qtdFollowing")
    const publication = document.getElementById("qtdPublications")
    const divPublications = document.getElementById("divPublications")

    divPublications.innerHTML = ""

    const res = await fetch(`/user/${idCuber}`)
    user = await res.json()

    username.innerHTML = user.nameCuber
    followers.innerHTML = user.followersCuber
    following.innerHTML = user.followingCuber
    publication.innerHTML = user.publicationsCuber

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
                                <img src="../assets/icons/hearthIconOutline.png">
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
}

function showEdit(indexPublication){
    const title = document.getElementById("iptTitleUpdate")
    const desc = document.getElementById("iptDescUpdate")
    const btnUpdate = document.getElementById("btnUpdate")

    const modal = document.getElementById("modalUpdate")
    const publication = user.publications[indexPublication]

    title.value = publication.titlePublication
    desc.value = publication.contentPublication
    btnUpdate.onclick = () => updatePublication(indexPublication)

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

    const modal = document.getElementById("modalUpdate")
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
    .then(async (res) => {
        const json = await res.json()
        title.value = ""
        desc.value = ""
        renderUser(idCuber)
        closeEdit()
    })
}