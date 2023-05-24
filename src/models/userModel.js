var database = require("../database/config")

function findByName(username){
    const instrucao = `
        SELECT idCuber FROM Cuber WHERE nameCuber = '${username}'
    `
    return database.executar(instrucao)
}

function infos(idCuber) {
    const instrucao = `
        SELECT 
        nameCuber,
        imageUrl,
        (
            SELECT 
                count(*)
            FROM Followers f
            WHERE f.fkCuber = c.idCuber
        ) "followersCuber",
        (
            SELECT 
                count(*)
            FROM Followers f
            WHERE f.fkFollower = c.idCuber
        ) "followingCuber",
        (
            SELECT
                count(*)
            FROM Publication p
            WHERE p.fkCuber = c.idCuber
        ) "publicationsCuber"
        FROM Cuber c
        WHERE c.idCuber = ${idCuber}; 
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
    register,
    findByName,
};