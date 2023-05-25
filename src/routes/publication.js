const express = require("express")
const router =  express.Router()

const publicationController = require("../controllers/publicationController")

router.post("/create/:idCuber",(req, res) => {
    publicationController.create(req, res)
})

module.exports = router