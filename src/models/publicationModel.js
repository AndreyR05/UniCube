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

function listPublication(idCuber){
    const sql = `
        SELECT
            c.nameCuber,
            c.imageUrl,
            p.*,
            CASE WHEN EXISTS (SELECT * FROM likes l WHERE l.fkCuber = ${idCuber} and l.fkPublication = p.idPublication)
                THEN true
                ELSE false
            END "liked",
            (
                SELECT COUNT(*) FROM likes l WHERE l.fkPublication = p.idPublication
            ) "likes"
        FROM Publication p
        JOIN Cuber c ON c.idCuber = p.fkCuber
        WHERE p.fkCuber != ${idCuber}
        ORDER BY p.idPublication 
        DESC;
    `
    return database.executar(sql)
}

function addLike(idPublication, idCuber){
    const sql = `
        INSERT INTO Likes VALUES
        (${idCuber}, ${idPublication}, DATE(NOW()));
    `
    return database.executar(sql)
}
function removeLike(idPublication, idCuber){
    const sql = `
        DELETE FROM Likes WHERE fkCuber = ${idCuber} and fkPublication = ${idPublication};
    `
    return database.executar(sql)
}

module.exports = {
    create,
    update,
    deletePublication,
    listPublication,
    addLike,
    removeLike
}