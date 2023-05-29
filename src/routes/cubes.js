const express = require("express")
const router =  express.Router()

const cubesController = require("../controllers/cubesController")

router.post("/create/:idCuber",(req, res) => {
    cubesController.create(req, res)
})

module.exports = router