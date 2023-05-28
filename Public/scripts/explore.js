let exploreSection = 0

window.onload = () => {
    const { idCuber } = localStorage

    if(idCuber)
        fetch(`/publication/explore/${idCuber}`)
        .then(async res => {
            const { publications } = await res.json()
            loadPublications(publications)
        })
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
                        <button class="btnLike">
                            <p>${publications[i*3+j].likes}</p>
                            <img src="${publications[i*3+j].liked ? "../assets/icons/hearthIconFill.png" : "../assets/icons/hearthIconOutline.png"}">
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