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
        ) "publicationsCuber",
        (
            SELECT 
                count(*)
            FROM CubeCollection cc 
            WHERE cc.fkCuber = c.idCuber
        ) "cubesCuber"
        FROM Cuber c
        WHERE c.idCuber = ${idCuber}; 
    `;
    return database.executar(instrucao);
}

function cubes(idCuber){
    const sql = `
        SELECT *
        FROM CubeCollection
        WHERE fkCuber = ${idCuber}
    `
    return database.executar(sql)
}
function publications(idCuber){
    const instrucao = `
        SELECT
        *, 
        (
            SELECT 
                count(*) 
            FROM Likes l 
            WHERE l.fkPublication = p.idPublication
        ) "likes"
        FROM Publication p
        WHERE fkCuber = ${idCuber}; 
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

function follow(idCuber, idFollower){
    const sql = `
        INSERT INTO Followers VALUES (${idCuber},${idFollower}, DATE(NOW()));
    `
    return database.executar(sql)
}
function unfollow(idCuber, idFollower){
    const sql = `
        DELETE FROM Followers WHERE fkCuber = ${idCuber} and fkFollower = ${idFollower};
    `
    return database.executar(sql)
}

function following(idCuber){
    const sql = `
    SELECT fkCuber FROM Followers WHERE fkFollower = ${idCuber};
    `
    return database.executar(sql)
}

module.exports = {
    infos,
    login,
    register,
    findByName,
    publications,
    cubes,
    follow,
    unfollow,
    following
};