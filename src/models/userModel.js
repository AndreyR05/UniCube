var database = require("../database/config")

function infos() {
    var instrucao = `
        SELECT * FROM usuario;
    `;
    return database.executar(instrucao);
}

function login(email, senha) {
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;

    return database.executar(instrucao);
}

function register(nome, senha) {
    var instrucao = `
        INSERT INTO Cuber (nameCuber, passwordCuber) VALUES ('${nome}', '${senha}');
    `;

    return database.executar(instrucao);
}

module.exports = {
    infos,
    login,
    register
};