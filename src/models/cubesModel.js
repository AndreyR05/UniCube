const database = require("../database/config")

function create(name, rarity, idCuber){
    const sql = `
        INSERT INTO CubeCollection VALUES 
        (
            (
                SELECT 
                    CASE WHEN MAX(cc.idCube) != 0
                        THEN MAX(cc.idCube)+1
                        ELSE 1
                    END 'LastId'
                FROM CubeCollection cc WHERE cc.fkCuber = ${idCuber}
            ),
            '${name}','${rarity}',${idCuber}
        );
    `

    return database.executar(sql)
}

module.exports = {
    create
}