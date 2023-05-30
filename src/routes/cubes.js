const express = require("express")
const router =  express.Router()

const cubesController = require("../controllers/cubesController")

router.post("/create/:idCuber",(req, res) => {
    cubesController.create(req, res)
})
router.put("/update/:idCuber", (req, res) => {
    cubesController.update(req, res)
})
router.delete("/delete",(req, res) => {
    cubesController.deleteCube(req, res)
})

module.exports = router