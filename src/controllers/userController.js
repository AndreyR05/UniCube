const userModel = require("../models/userModel");

function infos(req, res) {
    const { idCuber } = req.params
    userModel.infos(idCuber)
        .then(function (resultado) {
            if (resultado.length) {
                res.status(200).json(resultado[0]);
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

module.exports = {
    login,
    register,
    infos
}