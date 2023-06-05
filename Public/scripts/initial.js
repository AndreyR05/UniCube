let publications = []

window.onload = async () => {
    const { idCuber } = localStorage

    if(idCuber){
        const userImg = document.getElementById("divUserImg")
        userImg.href = "#"
        userImg.onclick = () => Options()
        fetch(`/publication/mostLikedInMonth/${idCuber}`)
        .then(res => res.json())
        .then(res => {
            publications = res.publications
            loadCards(res)
        })
    }
    else{
        fetch(`/publication/initial/disconnected`)
        .then(res => res.json())
        .then(res => {
            publications = res.publications
            loadCards(res)
        })
    }
}

function loadCards(res){
    const contCards = document.getElementById("contCards")
    contCards.innerHTML += ""
    for(let i = 0; i < res.publications.length; i++){
        contCards.innerHTML += `
            <div class="divCard">
                <div class="divTitleCard">
                    <div class="divUserCard" onclick="navigate(${res.publications[i].fkCuber})">
                        <div class="imgUserCard">
                            <img src="../assets/icons/userIcon.png">
                        </div>
                        <p>${res.publications[i].nameCuber}</p>
                    </div>
                    ${
                        res.publications[i].liked
                        ? `
                            <button class="btnLike" onclick="handleLikes(${res.publications[i].idPublication})">
                                <p id="likesCount${i}" class="txtLike">${res.publications[i].likes ? res.publications[i].likes : 0}</p>
                                <img id="heart${i}" src="${res.publications[i].liked ? "../assets/icons/heartIconFill.png" : "../assets/icons/heartIconOutline.png"}">
                            </button>
                        ` : `
                            <a class="btnLike" href='../register.html'>
                                <p id="likesCount${i}" class="txtLike">${res.publications[i].likes ? res.publications[i].likes : 0}</p>
                                <img id="heart${i}" src="../assets/icons/heartIconOutline.png">
                            </a>
                        `
                    }
                </div>
                <img class="imgCover" src="../assets/site/${res.publications[i].imageUrl}">
                <div class="divContentCard">
                    <p class="txtTitleContent">${res.publications[i].titlePublication}</p>
                    <p class="txtContent">${res.publications[i].contentPublication}</p>
                </div>
            </div>
        `
    }
}

function handleLikes(idPublication){
    const { idCuber } = localStorage
    const publication = publications[publications.map(item => item.idPublication).indexOf(idPublication)]
    const index = publications.map(item => item.idPublication).indexOf(idPublication)

    console.log("opa")
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
            const heart = document.getElementById(`heart${index}`)
            const likesCount = document.getElementById(`likesCount${index}`)
            heart.src = "../assets/icons/heartIconFill.png"
            likesCount.innerHTML = publication.likes
        })
    }
}