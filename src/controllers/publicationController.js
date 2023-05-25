const publicationModel = require("../models/publicationModel")

function create(req, res){
    const idCuber = req.params.idCuber
    const title = req.body.title
    const desc = req.body.desc

    publicationModel.create(title, desc, idCuber)
        .then(response => {
            console.log(response)
            res.status(200).json({msg: "Publicação criada com sucesso"})
        })
}

module.exports = {
    create
}