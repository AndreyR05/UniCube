const database = require("../database/config")

function create(name, rarity, image, idCuber){
    const sql = `
        INSERT INTO CubeCollection (idCube, nameCube, rarity, imageUrl, fkCuber) VALUES 
        (
            (
                SELECT 
                    CASE WHEN MAX(cc.idCube) != 0
                        THEN MAX(cc.idCube)+1
                        ELSE 1
                    END 'LastId'
                FROM CubeCollection cc WHERE cc.fkCuber = ${idCuber}
            ),
            '${name}','${rarity}', '${image}', ${idCuber}
        );
    `

    return database.executar(sql)
}
function update(name, rarity, idCuber, idCube){
    const sql = `
        UPDATE CubeCollection SET nameCube = '${name}', rarity = '${rarity}' WHERE idCube = ${idCube} and fkCuber = ${idCuber};
    `
    return database.executar(sql)
}
function updateWithImage(name, rarity, image, idCuber, idCube){
    const sql = `
        UPDATE CubeCollection 
        SET
            nameCube = '${name}',
            rarity = '${rarity}',
            imageUrl = '${image}'
        WHERE 
            idCube = ${idCube} and fkCuber = ${idCuber};
    `
    return database.executar(sql)
}
function deleteCube(idCuber, idCube){
    const sql = `
        DELETE FROM CubeCollection WHERE idCube = ${idCube} and fkCuber = ${idCuber};
    `
    return database.executar(sql)
}

module.exports = {
    create,
    update,
    updateWithImage,
    deleteCube
}