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

function register(nome, email, senha) {
    var instrucao = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;

    return database.executar(instrucao);
}

module.exports = {
    infos,
    login,
    register
};