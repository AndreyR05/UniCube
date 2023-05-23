const userModel = require("../models/userModel");

function infos(req, res) {
    userModel.infos()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function login(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (username || senha) {
        res.status(400).send("Existe dados não preenchidos");
    } else {
        
        userModel.login(email, senha)
            .then(
                function (resultado) {
                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
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