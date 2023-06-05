const userModel = require("../models/userModel");

function infos(req, res) {
    const { idCuber } = req.params
    userModel.infos(idCuber)
        .then(async resultado => {
            if (resultado.length) {
                const publications = await userModel.publications(idCuber)
                const cubes = await userModel.cubes(idCuber)
                res.status(200).json({
                    ...resultado[0],
                    publications: publications,
                    cubes: cubes
                });
            } else {
                res.status(404).json({msg: "Nenhum resultado encontrado!"})
            }
        }).catch(
            function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) { 
        res.status(400).json("Existe dados não preenchidos");
    } else {
        userModel.login(username, password)
            .then(resultado => {
                    if (resultado.length == 1) {
                        res.status(200).json({msg: resultado[0]});
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function register(req, res) {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(400).json({msg: "Existem informações não preenchidas!"});
    } else {
        userModel.findByName(username)
        .then((users) => {
            if(users.length == 0){
                userModel.register(username, password)
                .then((resultado) => res.status(200).json(resultado))
                .catch(
                    function (erro) {
                        console.log(erro);
                        console.log(
                            "\nHouve um erro ao realizar o cadastro! Erro: ",
                            erro.sqlMessage
                        );
                        res.status(500).json(erro.sqlMessage);
                    }
                )
            }
            else{
                res.status(403).json({msg: "O nome desejado ja esta em uso"})
            }
            }
        )
    }
}

function follow(req, res){
    const {idCuber, idFollower} = req.body

    userModel.follow(idCuber, idFollower)
        .then(() => {
            res.status(200).json({msg: "Usuário seguido com sucesso"})
        })
}
function unfollow(req, res){
    const {idCuber, idFollower} = req.body

    userModel.unfollow(idCuber, idFollower)
        .then(() => {
            res.status(200).json({msg: "Deixou de seguir o usuário com sucesso"})
        })
}

function following(req, res){
    const {idCuber} = req.params

    userModel.following(idCuber)
        .then(response => {
            res.status(200).json({following: response})
        })
}

function changeImage(req, res){
    const { idCuber } = req.params
    const image = req.file.filename
    console.log(image)

    userModel.changeImage(idCuber, image)
        .then(() =>
            res.status(200).json({msg: "image do usuário trocada"})
        )
}

module.exports = {
    login,
    register,
    infos,
    follow,
    unfollow,
    following,
    changeImage
}