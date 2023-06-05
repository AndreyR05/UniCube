const cubesModel = require("../models/cubesModel")

function create(req, res){
    const idCuber = req.params.idCuber
    const { name, rarity } = req.body
    const image = req.file.filename

    if(!name || !rarity){
        res.status(400).json({error: "Campos não preenchidos"})
    }
    else{
        cubesModel.create(name, rarity, image, idCuber)
            .then(response => {
                console.log(response)
                res.status(200).json({msg: "Cubo adicionado a coleção com sucesso"})
            })
    }
}

function update(req, res){
    const idCuber = req.params.idCuber
    const { name, rarity, idCube } = req.body

    if(!name || !rarity){
        res.status(400).json({error: "Campos não preenchidos"})
    }
    else{
        cubesModel.update(name, rarity, idCuber, idCube)
            .then(response => {
                console.log(response)
                res.status(200).json({msg: "Cubo adicionado a coleção com sucesso"})
            })
    }
}

function deleteCube(req, res){
    const { idCuber, idCube } = req.body
    cubesModel.deleteCube(idCuber, idCube)
        .then(() => {
            res.status(200).json({msg: "Cubo removido da coleção com sucesso"})
        })
}

module.exports = {
    create,
    update,
    deleteCube
}