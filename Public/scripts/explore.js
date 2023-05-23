let exploreSection = 0

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