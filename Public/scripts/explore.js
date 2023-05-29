let exploreSection = 0
let publications = []

window.onload = () => {
    const { idCuber } = localStorage

    if(idCuber){
        const userImg = document.getElementById("divUserImg")
        userImg.href = "profile.html"
        fetch(`/publication/explore/${idCuber}`)
        .then(async res => {
            const publicationsJson = (await res.json()).publications
            publications = publicationsJson
            loadPublications(publicationsJson)
        })
    }
}

function loadPublications(publications){
    const content = document.getElementById("contentExplore")
    for(let i = 0; i < publications.length / 3; i++){
        let items = 3
        if(i >= publications.length / 3 - 1 &&  publications.length % 3 != 0){
            items = publications.length % 3
        }

        const divRow = document.createElement("div")
        divRow.classList.add("divRowCards")
        for(let j = 0; j < items; j++){
            divRow.innerHTML += `
                <div class="divCard">
                    <div class="divTitleCard">
                        <div class="divUserCard">
                            <div class="imgUserCard">
                                <img src="../assets/icons/userIcon.png">
                            </div>
                            <p>${publications[i*3+j].nameCuber}</p>
                        </div>
                        <button class="btnLike" onclick="handleLikes(${i*3+j})">
                            <p id="likesCount${i*3+j}" class="txtLike">${publications[i*3+j].likes}</p>
                            <img id="heart${i*3+j}" src="${publications[i*3+j].liked ? "../assets/icons/heartIconFill.png" : "../assets/icons/heartIconOutline.png"}">
                        </button>
                    </div>
                    <img class="imgCover" src="../assets/imgs/octahedron.png">
                    <div class="divContentCard">
                        <p class="txtTitleContent">${publications[i*3+j].titlePublication}</p>
                        <p class="txtContent">${publications[i*3+j].contentPublication}</p>
                    </div>
                </div>
            `
        }
        content.appendChild(divRow)
    }
}

function handleLikes(indexPublication){
    const { idCuber } = localStorage
    const publication = publications[indexPublication]

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
            const heart = document.getElementById(`heart${indexPublication}`)
            const likes = document.getElementById(`likesCount${indexPublication}`)
            heart.src = "../assets/icons/heartIconOutline.png"
            publication.likes--
            publication.liked = 0
            likes.innerHTML = publication.likes
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
            const heart = document.getElementById(`heart${indexPublication}`)
            const likes = document.getElementById(`likesCount${indexPublication}`)
            heart.src = "../assets/icons/heartIconFill.png"
            publication.likes++
            publication.liked = 1
            likes.innerHTML = publication.likes 
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