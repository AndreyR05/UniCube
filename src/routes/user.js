var express = require("express");
var router = express.Router();

var userController = require("../controllers/userController");

router.get("/:idCuber", function (req, res) {
    userController.infos(req, res);
});

router.post("/register", function (req, res) {
    userController.register(req, res);
})

router.post("/login", function (req, res) {
    userController.login(req, res);
});

module.exports = router;