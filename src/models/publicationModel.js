const database = require("../database/config")

function create(title, titlePublication, idCuber){
    const sql = `
        INSERT INTO
            Publication (titlePublication, contentPublication, fkCuber)
        VALUES
            ('${title}', '${titlePublication}', ${idCuber});
    `

    return database.executar(sql)
}

module.exports = {
    create
}