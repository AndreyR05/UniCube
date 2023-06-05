const publicationModel = require("../models/publicationModel")

function create(req, res){
    const idCuber = req.params.idCuber
    const title = req.body.title
    const desc = req.body.desc
    const imagePath = req.file.filename;

    publicationModel.create(title, desc, imagePath, idCuber)
        .then(response => {
            console.log(response)
            res.status(200).json({msg: "Publicação criada com sucesso"})
        })
}
function update(req, res){
    const idPublication = req.params.idPublication
    const { title, desc } = req.body

    publicationModel.update(title, desc, idPublication)
        .then(response => {
            res.status(200).json({msg: "Publicação atualiazada com sucesso"})
        })
}
function updateWithImage(req, res){
    const idPublication = req.params.idPublication
    const { title, desc } = req.body
    const image = req.file.filename

    publicationModel.updateWithImage(title, desc, image, idPublication)
        .then(response => {
            res.status(200).json({msg: "Publicação atualiazada com sucesso"})
        })
}
function deletePublication(req, res){
    const { idPublication } = req.params

    publicationModel.removeLikesPublication(idPublication).then(() => {
        publicationModel.deletePublication(idPublication)
        .then(() => {
            res.status(200).json({msg: "deletado com sucesso"})
        })
    })
}
function listPublication(req, res){
    const { idPublication } = req.params

    publicationModel.listPublication(idPublication)
        .then(response => {
            res.status(200).json({publications: response})
        })
}
function addLike(req,res){
    const { idPublication, idCuber } = req.body

    publicationModel.addLike(idPublication, idCuber)
        .then(() => {
            res.status(200).json({msg: "curtido com sucesso"})
        })
}
function removeLike(req,res){
    const { idPublication, idCuber } = req.body

    publicationModel.removeLike(idPublication, idCuber)
        .then(() => {
            res.status(200).json({msg: "curtido com sucesso"})
        })
}
function likesByDate(req, res){
    const { idPublication } = req.params

    publicationModel.likesByDate(idPublication)
        .then(response => {
            res.status(200).json({likes: response})
        })
}
function mostLikedMonth(req, res){
    const { idCuber } = req.params
    publicationModel.mostLikedMonth(idCuber)
        .then(response => {
            res.status(200).json({publications: response})
        })
}
function mostLikedMonthDisconnected(req, res){
    publicationModel.mostLikedMonthDisconnected()
        .then(response => {
            res.status(200).json({publications: response})
        })
}

module.exports = {
    create,
    update,
    updateWithImage,
    deletePublication,
    listPublication,
    addLike,
    removeLike,
    likesByDate,
    mostLikedMonth,
    mostLikedMonthDisconnected
}