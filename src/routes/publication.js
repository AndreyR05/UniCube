const express = require("express")
const router =  express.Router()

const publicationController = require("../controllers/publicationController")

router.post("/create/:idCuber",(req, res) => {
    publicationController.create(req, res)
})
router.put("/update/:idPublication", (req, res) => {
    publicationController.update(req, res)
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

module.exports = router