const upload = require("../upload/config")
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
router.post("/follow", (req, res) => {
    userController.follow(req, res)
})
router.delete("/unfollow", (req, res) => {
    userController.unfollow(req, res)
})
router.get("/following/:idCuber", (req, res) => {
    userController.following(req, res)
})
router.put("/changeImage/:idCuber", upload.single('image'), (req, res) => {
    userController.changeImage(req, res)
})
module.exports = router;