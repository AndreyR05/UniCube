let user
let chart

window.onload = async () => {
    const { idCuber, navigateId } = localStorage 

    if(!idCuber && !navigateId){
        window.location.href = "/register.html"
    }
    else if(idCuber == navigateId || !navigateId){
        const canvas = document.getElementById("chart")
        const userImg = document.getElementById("divUserImg")
        const btnFollow = document.getElementById("btnFollow")

        btnFollow.style.display = "none"
        userImg.href = "#"
        userImg.onclick = () => Options()

        renderUser(idCuber, false)

        chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Curtidas',
                    data: [],
                    fill: false,
                    borderColor: '#DC2626',
                    borderWidth: 0,
                    pointBorderWidth: 0,
                    tension: .4
                }]
            },
            options: {
                borderRadius: 5,
                scales: {
                    y: {
                        grid: {
                            color: '#F0F0F04D'
                        },
                        suggestedMax: 10,
                    },
                    x: {
                        grid: {
                            color: '#F0F0F04D'
                        },
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },
            

        })
    }
    else{
        const userImg = document.getElementById("divUserImg")
        const btnNewPublication = document.getElementById("btnNewPublication")
        const btnFollow = document.getElementById("btnFollow")

        const res = await fetch(`/user/following/${idCuber}`)
        const { following } = await res.json()

        if(following.map(item => item.fkCuber).indexOf(Number(navigateId)) != -1){
            btnFollow.innerHTML = "Seguindo"
            btnFollow.onclick = () => follow(true)
        }

        btnNewPublication.style.display = "none"
        userImg.href = "#"
        userImg.onclick = () => Options()

        renderUser(navigateId, true)
    }
}

async function likesByDate(idPublication){
    const  modal = document.getElementById("modalChart")
    const noLikesMsg = document.getElementById("divNoLikes")
    const chartCanvas = document.getElementById("chart")
    const analytics = document.getElementById("analytics")
    modal.style.display = "flex"
    
    const res = await fetch(`/publication/${idPublication}/likes`)
    const { likes }  = await res.json()

    if(likes.length > 0){
        noLikesMsg.style.display = "none"
        chartCanvas.style.display = "flex"
        analytics.style.display = "flex"

        let labels = []
        const datePublication = new Date(likes[0].datePublication)
        const today = new Date()
        today.setDate(today.getDate()+1)

        for(let i = datePublication; i.toDateString() != today.toDateString(); i.setDate(i.getDate()+1)){
            labels.push(i.toJSON().split('T')[0].split('-').reverse().join('/'))
        }

        const datesValues = likes.map(item => item.date.split('T')[0].split('-').reverse().join('/'))
        const values = likes.map(item => item.amount)

        const data = labels.map(item => {
            const labelIndex = datesValues.indexOf(item)
            if(labelIndex != -1){
                const color = 
                    values[labelIndex] > 100
                    ? '#84CC16' 
                    : values[labelIndex] > 50
                    ? '#2563EB'
                    : '#DC2626'

                return {
                    values: values[labelIndex],
                    color: color
                }
            }
            return 0
        })

        if(data.length < 6){
            chart.options.scales.x.min = 0
            chart.options.scales.x.max = data.length
        }else{
            chart.options.scales.x.min = data.length-6
            chart.options.scales.x.max = data.length-1
        }
        chart.data.datasets[0].backgroundColor = data.map(item => item.color)
        chart.data.datasets[0].data = data.map(item => item.values)
        chart.data.labels = labels
        chart.update()
    }else{
        noLikesMsg.style.display = "flex"
        chartCanvas.style.display = "none"
        analytics.style.display = "none"
    }
}
function closeChart(){
    const  modal = document.getElementById("modalChart")
    modal.style.display = "none"
}

const chartElement = document.getElementById("chart")
chartElement.addEventListener("wheel",(e) => {
    console.log(chart.options.scales.x.min, chart.options.scales.x.max)
    if (e.deltaY > 0) {
        if (chart.options.scales.x.max >= chart.data.datasets[0].data.length - 1) {
            chart.options.scales.x.min = chart.data.datasets[0].data.length - 6;
            chart.options.scales.x.max = chart.data.datasets[0].data.length - 1;
        } else {
            chart.options.scales.x.min += 1;
            chart.options.scales.x.max += 1;
        }
      } else if (e.deltaY < 0) {
        if (chart.options.scales.x.min <= 0) {
            chart.options.scales.x.min = 0;
            chart.options.scales.x.max = 5;
        } else {
            chart.options.scales.x.min -= 1;
            chart.options.scales.x.max -= 1;
        }
    }
    chart.update()
})

async function renderUser(idCuber, isVisitor){
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
    const cubesNumCard = user.cubesCuber > 3 ? 3 : user.cubesCuber
    for(let i = 0; i < cubesNumCard; i++){
        itemsUser.innerHTML +=`<div class="divCollectionItem">
            <img src="../assets/site/${user.cubes[i].imageUrl}" alt="">
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
            if(isVisitor != true){
                divRow.innerHTML += `
                    <div class="divCard">
                        <img class="imgCover" src="../assets/site/${user.publications[i*5+j].imageUrl}">
                        <div class="divContentCard">
                            <p class="txtTitleContent">${user.publications[i*5+j].titlePublication}</p>
                            <div class="divRowData">
                                <div class="divPostLikes" onclick="likesByDate(${user.publications[i*5+j].idPublication})">
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
            else {
                divRow.innerHTML += `
                    <div class="divCard">
                        <img class="imgCover" src="../assets/site/${user.publications[i*5+j].imageUrl}">
                        <div class="divContentCard">
                            <p class="txtTitleContent">${user.publications[i*5+j].titlePublication}</p>
                            <div class="divRowData">
                                <p class="txtContent">${user.publications[i*5+j].contentPublication}</p>
                            </div>
                        </div>
                    </div>
                `
            }
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
                if(isVisitor != true){
                    divRow.innerHTML += `
                        <div class="divCollectionContentItems">
                            <button class="btnEdit" onclick="showEditCube(${i*4+j})">
                                <img src="assets/icons/dotsIcon.png">
                            </button>
                            <img src="assets/site/${user.cubes[i*4+j].imageUrl}" alt="">
                            <div class="itemInfo">
                                <p class="txtNameItem">${user.cubes[i*4+j].nameCube}</p>
                                <img class="rarity" src="assets/icons/rarity${rarity}.png" title="${user.cubes[i*4+j].rarity}">
                            </div>
                        </div>
                    `
                }
                else{
                    divRow.innerHTML += `
                        <div class="divCollectionContentItems">
                            <img src="assets/site/${user.cubes[i*4+j].imageUrl}" alt="">
                            <div class="itemInfo">
                                <p class="txtNameItem">${user.cubes[i*4+j].nameCube}</p>
                                <img class="rarity" src="assets/icons/rarity${rarity}.png" title="${user.cubes[i*4+j].rarity}">
                            </div>
                        </div>
                    `
                }

            }
            else if(isVisitor != true){
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
function showEditCube(indexCube){
    const modal = document.getElementById("modalEditCube")
    const inputName = document.getElementById("iptNameEdit")
    const inputRarity = document.getElementById("iptRarityEdit")
    const editButton = document.getElementById("editButton")
    const btnDelete = document.getElementById("btnDeleteCube")
    const img = document.getElementById("iptImgEditCube")
    modal.style.display = "flex"

    const { idCube, nameCube, rarity, imageUrl } = user.cubes[indexCube]
    inputName.value = nameCube
    inputRarity.value = rarity
    img.src = `../assets/site/${imageUrl}`

    editButton.onclick = () => editCube(idCube)
    btnDelete.onclick = () => deleteCube(idCube)
}
function closeEditCube(){
    const modal = document.getElementById("modalEditCube")
    modal.style.display = "none"
}

function editCube(idCube){
    const { idCuber } = localStorage

    const inputName = document.getElementById("iptNameEdit")
    const inputRarity = document.getElementById("iptRarityEdit")
    const inputImg = document.getElementById("iptFileEditCube")

    if(!inputName.value || !inputRarity.value){
        alert("Campos não preenchidos")
    }
    else if(inputName.value.length > 50){
        alert("O nome pode ter no máximo 50 caracteres")
    }
    else if(inputImg.files[0]){
        const f = new FormData()
        f.append('idCube', idCube)
        f.append('image', inputImg.files[0])
        f.append('rarity', inputRarity.value)
        f.append('name', inputName.value)

        fetch(`/cubes/updateWithImage/${idCuber}`,{
            method: "PUT",
            body: f
        })
        .then(res => {
            if(res.status == 200){
                inputName.value = ""
                inputRarity.value = ""
                renderUser(idCuber)
                closeEditCube()
                changeScreen(1)
            }
        })
    }
    else{
        fetch(`/cubes/update/${idCuber}`,{
            method: "PUT",
            headers: {
                "Content-Type":'application/json'
            },
            body: JSON.stringify({
                idCube: idCube,
                name: inputName.value,
                rarity: inputRarity.value
            })
        })
        .then(res => {
            if(res.status == 200){
                inputName.value = ""
                inputRarity.value = ""
                renderUser(idCuber)
                closeEditCube()
                changeScreen(1)
            }
        })
    }
}

function deleteCube(idCube){
    const { idCuber } = localStorage

    fetch(`/cubes/delete`,{
        method: "DELETE",
        headers: {
            "Content-Type":'application/json'
        },
        body: JSON.stringify({
            idCube: idCube,
            idCuber: idCuber
        })
    })
    .then(res => {
        if(res.status == 200){
            renderUser(idCuber)
            closeEditCube()
            changeScreen(1)
        }
    })
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
    const image = document.getElementById("iptFileCube")
    const button = document.getElementById("btnCreateCube")

    if(!name.value || !rarity.value || !image.files[0]){
        alert("Campos não preenchidos")
    }
    else if(name.value.length > 50){
        alert("O nome pode ter no máximo 50 caracteres")
    }
    else{
        button.onclick = () => {}

        const f = new FormData()
        f.append('image', image.files[0])
        f.append('rarity', rarity.value)
        f.append('name', name.value)

        fetch(`/cubes/create/${idCuber}`,{
            method: "POST",
            body: f
        })
        .then(res => {
            button.onclick = () => createCube()

            if(res.status == 200){
                name.value = ""
                rarity.value = ""
                renderUser(idCuber)
                closeModalCube()
                changeScreen(1)
            }
        })
        .catch(() => {
            button.onclick = () => createCube()
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
    const image = document.getElementById("iptFilePublication")
    const elementImg = document.getElementById("iptImgPublication")
    const button = document.getElementById("btnCreate")

    if(!title.value || !desc.value || !image.files[0]){
        alert("Campos não preenchidos")
    }
    else if(title.value.length > 50){
        alert("O titulo pode ter no máximo 50 caracteres")
    }
    else if(desc.value.length > 1000){
        alert("A descrição pode ter no máximo 1000 caracteres")
    }
    else{
        button.onclick = () => {}

        const f = new FormData()
        f.append('image', image.files[0])
        f.append('title', title.value)
        f.append('desc', desc.value)

        fetch(`/publication/create/${idCuber}`,{
            method: 'POST',
            body: f
        })
        .then(() => {
            title.value = ""
            desc.value = ""
            image.files = new DataTransfer().files 
            elementImg.src = "assets/icons/downloadIcon.png"
            renderUser(idCuber)
            closeModal()
            button.onclick = () => createPublication()
        })
        .catch(() => {
            button.onclick = () => createPublication()
        })
    }
}

function showEdit(indexPublication){
    const title = document.getElementById("iptTitleUpdate")
    const desc = document.getElementById("iptDescUpdate")
    const btnUpdate = document.getElementById("btnUpdate")
    const btnDelete = document.getElementById("btnDelete")
    const img = document.getElementById("iptImgEditPublication")

    const modal = document.getElementById("modalUpdate")
    const publication = user.publications[indexPublication]

    title.value = publication.titlePublication
    desc.value = publication.contentPublication
    img.src = `../assets/site/${publication.imageUrl}`

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
    const image = document.getElementById("iptFileEditPublication")

    const publication = user.publications[indexPublication]
    if(!title.value || !desc.value){
        alert("Campos não preenchidos")
    }
    else if(title.value.length > 50){
        alert("O titulo pode ter no máximo 50 caracteres")
    }
    else if(desc.value.length > 1000){
        alert("A descrição pode ter no máximo 1000 caracteres")
    }
    else if(image.files[0]){
        const f = new FormData()
        f.append('image', image.files[0])
        f.append('title', title.value)
        f.append('desc', desc.value)

        fetch(`/publication/updateWithImage/${publication.idPublication}`,{
            method: 'PUT',
            body: f
        })
        .then((res) => {
            title.value = ""
            desc.value = ""
            renderUser(idCuber)
            closeEdit()
        })
    } else {

        fetch(`/publication/update/${publication.idPublication}`,{
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json'
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

function follow(isFollower){
    const btnFollow = document.getElementById("btnFollow")
    const {idCuber, navigateId} = localStorage

    if(isFollower){
        fetch(`/user/unfollow`,{
            method: "DELETE",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                idCuber: navigateId,
                idFollower: idCuber
            })
        })
        .then(() => {
            btnFollow.innerHTML = "Seguir"
            btnFollow.onclick = () => follow(false)
            renderUser(navigateId, true)
        })
    } else{
        fetch(`/user/follow`,{
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                idCuber:  navigateId,
                idFollower: idCuber
            })
        })
        .then(() => {
            btnFollow.innerHTML = "Seguindo"
            btnFollow.onclick = () => follow(true)
            renderUser(navigateId, true)
        })
    }
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

function allowDrop(e) {
    e.preventDefault();
    e.dataTransfer.setData("text", e.target.id);
}
function handlerDrop(e,iptName){
    e.preventDefault() 
    const img = document.getElementById(`iptImg${iptName}`)
    const ipt = document.getElementById(`iptFile${iptName}`)
    
    const file = e.dataTransfer ? e.dataTransfer.files[0] : ipt.files[0]
    
    if(e.dataTransfer){
        const dt = new DataTransfer()
        dt.items.add(file)
        ipt.files = dt.files
    }
    const reader = new FileReader();
    reader.onload = function(event) {
        img.src= event.target.result;
    };
    reader.readAsDataURL(file);
}