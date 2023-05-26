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

function update(title, content, idPublication){
    const sql = `
        UPDATE 
            Publication 
        SET
            titlePublication = '${title}',
            contentPublication = '${content}'
        WHERE
            idPublication = ${idPublication};
    `
    
    return database.executar(sql)
}

function deletePublication(idPublication){
    const sql = `
        DELETE FROM Publication WHERE idPublication = ${idPublication}
    `
    return database.executar(sql)
}

module.exports = {
    create,
    update,
    deletePublication
}