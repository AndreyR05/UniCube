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

        const res = await fetch(`/user/${idCuber}`)
        user = await res.json()


        username.innerHTML = user.nameCuber
        followers.innerHTML = user.followersCuber
        following.innerHTML = user.followingCuber
        publication.innerHTML = user.publicationsCuber
    }
}