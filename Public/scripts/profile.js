let user

window.onload = async() => {
    const idCuber = localStorage.idCuber

    if(!idCuber){
        window.location.href = "/register.html"
    }
    else{
        const username = document.getElementById("username")
        const followers = document.getElementById("qtdFollowers")
        const following = document.getElementById("qtdFollowing")
        const publication = document.getElementById("qtdPublications")
        const divPublications = document.getElementById("divPublications")

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
                numCards = 5 * (user.publications.length % 5) - rows*5 
            }

            const divRow = document.createElement("div")
            divRow.classList.add("divRowCards")

            console.log(numCards)
            for(let j = 0; j < numCards; j++){
                divRow.innerHTML += `
                    <div class="divCard">
                        <img class="imgCover" src="../assets/imgs/octahedron.png">
                        <div class="divContentCard">
                            <p class="txtTitleContent">${user.publications[(i+1)*j].titlePublication}</p>
                            <div class="divRowData">
                                <div class="divPostLikes">
                                    <img src="../assets/icons/hearthIconOutline.png">
                                    <p>${user.publications[(i+1)*j].likes}</p>
                                </div>

                                <button class="btnPostEdit">
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
}