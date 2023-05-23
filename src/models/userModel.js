var database = require("../database/config")

function infos() {
    var instrucao = `
        SELECT * FROM usuario;
    `;
    return database.executar(instrucao);
}

function login(username, password) {
    const instrucao = `
        SELECT idCuber FROM Cuber WHERE nameCuber = '${username}' AND passwordCuber = '${password}';
    `;

    return database.executar(instrucao);
}

function register(username, password) {
    const instrucao = `
        INSERT INTO Cuber (nameCuber, passwordCuber) VALUES ('${username}', '${password}');
    `;

    return database.executar(instrucao);
}

module.exports = {
    infos,
    login,
    register
};