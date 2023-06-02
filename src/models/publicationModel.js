const database = require("../database/config")

function create(title, titlePublication, idCuber){
    const sql = `
        INSERT INTO
            Publication (titlePublication, contentPublication, fkCuber, datePublication)
        VALUES
            ('${title}', '${titlePublication}', ${idCuber}, DATE(NOW()));
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

function removeLikesPublication(idPublication){
    const sql = `
        DELETE FROM Likes WHERE fkPublication = ${idPublication} 
    `
    return database.executar(sql)
}

function listPublication(idCuber){
    const sql = `
        SELECT
            c.nameCuber,
            c.imageUrl,
            p.*,
            CASE WHEN EXISTS (SELECT * FROM Likes l WHERE l.fkCuber = ${idCuber} and l.fkPublication = p.idPublication)
                THEN true
                ELSE false
            END "liked",
            CASE WHEN EXISTS (SELECT * FROM Followers f WHERE f.fkFollower = ${idCuber} and f.fkCuber = c.idCuber)
                THEN true
                ELSE false
            END "follow",
            (
                SELECT COUNT(*) FROM Likes l WHERE l.fkPublication = p.idPublication
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
function likesByDate(idPublication){
    const sql = `
        SELECT 
            COUNT(*) 'amount',
            l.likeDate 'date',
            (SELECT datePublication FROM Publication p WHERE p.idPublication = l.fkPublication) 'datePublication'
        FROM Likes l
        WHERE l.fkPublication = ${idPublication} 
        GROUP BY l.fkPublication, l.likeDate
        ORDER BY l.likeDate;    
    `
    return database.executar(sql)
}

module.exports = {
    create,
    update,
    deletePublication,
    listPublication,
    removeLikesPublication,
    addLike,
    removeLike,
    likesByDate
}