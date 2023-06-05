const upload = require("../upload/config")
const express = require("express")
const router =  express.Router()

const publicationController = require("../controllers/publicationController")

router.post("/create/:idCuber", upload.single('image'),(req, res) => {
    publicationController.create(req, res)
})
router.put("/update/:idPublication", (req, res) => {
    publicationController.update(req, res)
})
router.put("/updateWithImage/:idPublication", upload.single('image'), (req, res) => {
    publicationController.updateWithImage(req, res)
})
router.delete("/delete/:idPublication", (req, res) => {
    publicationController.deletePublication(req, res)
})
router.get("/explore/:idPublication", (req, res) => {
    publicationController.listPublication(req, res)
})
router.post("/like", (req, res) => {
    publicationController.addLike(req, res)
})
router.delete("/dislike",(req, res) => {
    publicationController.removeLike(req, res)
})
router.get("/:idPublication/likes", (req, res) => {
    publicationController.likesByDate(req, res)
})
router.get("/mostLikedInMonth/:idCuber",(req,res) =>{
    publicationController.mostLikedMonth(req,res)
})
router.get("/initial/disconnected",(req,res) =>{
    publicationController.mostLikedMonthDisconnected(req,res)
})
module.exports = router