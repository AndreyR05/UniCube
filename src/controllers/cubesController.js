const cubesModel = require("../models/cubesModel")

function create(req, res){
    const idCuber = req.params.idCuber
    const { name, rarity } = req.body

    if(!name || !rarity){
        res.status(400).json({error: "Campos não preenchidos"})
    }
    else{
        cubesModel.create(name, rarity, idCuber)
            .then(response => {
                console.log(response)
                res.status(200).json({msg: "Cubo adicionado a coleção com sucesso"})
            })
    }
}

module.exports = {
    create
}