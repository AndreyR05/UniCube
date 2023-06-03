let exploreSection = 0
let publications = []
let publicationsFollow = []


window.onload = () => {
    const { idCuber } = localStorage

    if(idCuber){

        const userImg = document.getElementById("divUserImg")
        userImg.href = "#"
        userImg.onclick = () => Options()

        fetch(`/publication/explore/${idCuber}`)
        .then(async res => {
            const publicationsJson = (await res.json()).publications
            publications = publicationsJson
            loadPublications(publicationsJson)
        })
    }
}

function loadPublications(publications){
    const contentExplore = document.getElementById("contentExplore")
    const contentFollowing = document.getElementById("contentFollow")

    for(let i = 0; i < publications.length / 3; i++){
        let items = 3
        if(i >= publications.length / 3 - 1 &&  publications.length % 3 != 0){
            items = publications.length % 3
        }

        const divRow = document.createElement("div")
        divRow.classList.add("divRowCards")
        for(let j = 0; j < items; j++){
            if(publications[i*3+j].follow){
                publicationsFollow.push(publications[i*3+j])
            }
            divRow.innerHTML += `
                <div class="divCard">
                    <div class="divTitleCard">
                        <div class="divUserCard" onclick="navigate(${publications[i*3+j].fkCuber})">
                            <div class="imgUserCard">
                                <img src="../assets/icons/userIcon.png">
                            </div>
                            <p>${publications[i*3+j].nameCuber}</p>
                        </div>
                        <button class="btnLike" onclick="handleLikes(${publications[i*3+j].idPublication})">
                            <p id="likesCount${i*3+j}" class="txtLike">${publications[i*3+j].likes}</p>
                            <img id="heart${i*3+j}" src="${publications[i*3+j].liked ? "../assets/icons/heartIconFill.png" : "../assets/icons/heartIconOutline.png"}">
                        </button>
                    </div>
                    <img class="imgCover" src="../assets/imgs/octahedron.png">
                    <div class="divContentCard">
                        <p class="txtTitleContent">${publications[i*3+j].titlePublication}</p>
                        <p class="txtContent">${publications[i*3+j].contentPublication}</p>
                    </div>
                    <div class="showMore" onclick="modalInfo(${publications[i*3+j].idPublication})">
                        <p>Ver mais</p>
                    </div>
                </div>
            `
        }
        contentExplore.appendChild(divRow)
    }
    
    for(let i = 0; i < publicationsFollow.length / 3; i++){
        let items = 3
        if(i >= publicationsFollow.length / 3 - 1 &&  publicationsFollow.length % 3 != 0){
            items = publicationsFollow.length % 3
        }

        const divRow = document.createElement("div")
        divRow.classList.add("divRowCards")
        for(let j = 0; j < items; j++){
            divRow.innerHTML += `
                <div class="divCard">
                    <div class="divTitleCard">
                        <div class="divUserCard" onclick="navigate(${publicationsFollow[i*3+j].fkCuber})">
                            <div class="imgUserCard">
                                <img src="../assets/icons/userIcon.png">
                            </div>
                            <p>${publicationsFollow[i*3+j].nameCuber}</p>
                        </div>
                        <button class="btnLike" onclick="handleLikes(${publicationsFollow[i*3+j].idPublication})">
                            <p id="likesCountFollow${i*3+j}" class="txtLike">${publicationsFollow[i*3+j].likes}</p>
                            <img id="heartFollow${i*3+j}" src="${publicationsFollow[i*3+j].liked ? "../assets/icons/heartIconFill.png" : "../assets/icons/heartIconOutline.png"}">
                        </button>
                    </div>
                    <img class="imgCover" src="../assets/imgs/octahedron.png">
                    <div class="divContentCard">
                        <p class="txtTitleContent">${publicationsFollow[i*3+j].titlePublication}</p>
                        <p class="txtContent">${publicationsFollow[i*3+j].contentPublication}</p>
                    </div>
                    <div class="showMore" onclick="modalInfo(${publications[i*3+j].idPublication})">
                        <p>Ver mais</p>
                    </div>
                </div>
            `
        }
        contentFollowing.appendChild(divRow)
    }
}

function modalInfo(idPublication){
    const modalPost = document.getElementById("modalPost")
    const nameUser = document.getElementById("nameUserModal")
    const likesCount = document.getElementById("likesCountModal")
    const heart = document.getElementById("heartModal")
    const title = document.getElementById("titleModal")
    const content = document.getElementById("contentModal")
    const btnLikes = document.getElementById("btnLikes")
    const userModal = document.getElementById("divUserModal")

    modalPost.style.display = "flex"

    const publication = publications[publications.map(item => item.idPublication).indexOf(idPublication)]
    
    nameUser.innerHTML = publication.nameCuber
    likesCount.innerHTML = publication.likes
    heart.src = publication.liked ? "../assets/icons/heartIconFill.png" : "../assets/icons/heartIconOutline.png"
    title.innerHTML = publication.titlePublication
    content.innerHTML = publication.contentPublication
    btnLikes.onclick = () => handleLikesModal(publication.idPublication)
    userModal.onclick = () => navigate(publication.fkCuber)
}

function closeModal(){
    const modalPost = document.getElementById("modalPost")
    modalPost.style.display = "none"
}

function handleLikesModal(idPublication){
    const { idCuber } = localStorage
    const publication = publications[publications.map(item => item.idPublication).indexOf(idPublication)]
    const index = publications.map(item => item.idPublication).indexOf(idPublication)
    const indexFollow = publicationsFollow.map(item => item.idPublication).indexOf(idPublication)

    if(publication.liked){
        fetch(`/publication/dislike`,{
            method: "DELETE",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                idPublication: publication.idPublication,
                idCuber: idCuber
            })
        })
        .then(() => {
            publication.likes--
            publication.liked = 0
            if(indexFollow != -1){
                const heartFollow = document.getElementById(`heartFollow${indexFollow}`)
                const likesCountFollow = document.getElementById(`likesCountFollow${indexFollow}`)
                heartFollow.src = "../assets/icons/heartIconOutline.png"
                likesCountFollow.innerHTML = publication.likes
            }
            const heart = document.getElementById(`heart${index}`)
            const likesCount = document.getElementById(`likesCount${index}`)
            const heartModal = document.getElementById(`heartModal`)
            const likesCountModal = document.getElementById(`likesCountModal`)
            heart.src = "../assets/icons/heartIconOutline.png"
            likesCount.innerHTML = publication.likes
            heartModal.src = "../assets/icons/heartIconOutline.png"
            likesCountModal.innerHTML = publication.likes
        })
    } else {
        fetch(`/publication/like`,{
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                idPublication: publication.idPublication,
                idCuber: idCuber
            })
        })
        .then(() => {
            publication.likes++
            publication.liked = 1
            if(indexFollow != -1){
                const heartFollow = document.getElementById(`heartFollow${indexFollow}`)
                const likesCountFollow = document.getElementById(`likesCountFollow${indexFollow}`)
                heartFollow.src = "../assets/icons/heartIconFill.png"
                likesCountFollow.innerHTML = publication.likes
            }
            const heart = document.getElementById(`heart${index}`)
            const likesCount = document.getElementById(`likesCount${index}`)
            const heartModal = document.getElementById(`heartModal`)
            const likesCountModal = document.getElementById(`likesCountModal`)
            heartModal.src = "../assets/icons/heartIconFill.png"
            likesCountModal.innerHTML = publication.likes
            heart.src = "../assets/icons/heartIconFill.png"
            likesCount.innerHTML = publication.likes
        })
    }
}

function handleLikes(idPublication){
    const { idCuber } = localStorage
    const publication = publications[publications.map(item => item.idPublication).indexOf(idPublication)]
    const index = publications.map(item => item.idPublication).indexOf(idPublication)
    const indexFollow = publicationsFollow.map(item => item.idPublication).indexOf(idPublication)

    if(publication.liked){
        fetch(`/publication/dislike`,{
            method: "DELETE",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                idPublication: publication.idPublication,
                idCuber: idCuber
            })
        })
        .then(() => {
            publication.likes--
            publication.liked = 0
            if(indexFollow != -1){
                const heartFollow = document.getElementById(`heartFollow${indexFollow}`)
                const likesCountFollow = document.getElementById(`likesCountFollow${indexFollow}`)
                heartFollow.src = "../assets/icons/heartIconOutline.png"
                likesCountFollow.innerHTML = publication.likes
            }
            const heart = document.getElementById(`heart${index}`)
            const likesCount = document.getElementById(`likesCount${index}`)
            heart.src = "../assets/icons/heartIconOutline.png"
            likesCount.innerHTML = publication.likes
        })
    } else {
        fetch(`/publication/like`,{
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                idPublication: publication.idPublication,
                idCuber: idCuber
            })
        })
        .then(() => {
            publication.likes++
            publication.liked = 1
            if(indexFollow != -1){
                const heartFollow = document.getElementById(`heartFollow${indexFollow}`)
                const likesCountFollow = document.getElementById(`likesCountFollow${indexFollow}`)
                heartFollow.src = "../assets/icons/heartIconFill.png"
                likesCountFollow.innerHTML = publication.likes
            }
            const heart = document.getElementById(`heart${index}`)
            const likesCount = document.getElementById(`likesCount${index}`)
            heart.src = "../assets/icons/heartIconFill.png"
            likesCount.innerHTML = publication.likes
        })
    }
}

function changeScreen(explorePage){
    const exploreContent = document.getElementById("exploreContent")
    const underline = document.getElementById("underline")
    const option1 = document.getElementById("option1")
    const option2 = document.getElementById("option2")
    
    if(explorePage == exploreSection){
        if(explorePage == 0){
            exploreContent.scrollTo(1400,0)
            exploreSection = 1
            underline.classList.add("disappear")
            underline.classList.add("appear")
            option1.children[0].classList.remove("select")
            setTimeout(() => {
                option1.removeChild(option1.children[1])
                option2.innerHTML = `
                    <button class="txtOptionsTitle select" onclick="changeScreen(0)">Explorar</button>
                    <div class="divContUnderline">
                        <div class="divUnderline appear" id="underline"></div>
                    </div>
                `
            }, 600)
        }
        else{
            exploreContent.scrollTo(-1400,0)
            exploreSection = 0
            underline.classList.add("disappear")
            underline.classList.add("appear")
            option2.children[0].classList.remove("select")
            setTimeout(() => {
                option2.removeChild(option2.children[1])
                option1.innerHTML = `
                    <button class="txtOptionsTitle select" onclick="changeScreen(1)">Seguindo</button>
                    <div class="divContUnderline">
                        <div class="divUnderline appear" id="underline"></div>
                    </div>
                `
            }, 600)
        }
    }
}