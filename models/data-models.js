var db = require('../database/db')

var schema = {
    'users': [
        "id",
        "username",
        "password",
        "email",
        "avatar",
        "signupTime"

    ],
    "post" : [
        "id",
        "title",
        "content",
        "createTime",
        "userId"
    ]
}

function readTable (table, cb) {
    let sql = `select * from ${table}`

    db.all(sql, function (err, rows) {
        if (err) {
            throw err;
        }
        
        cb(rows)
    })
}

function createRow(table, cb) {
    let sql = `insert into ${tabel} default values`
    db.run(sql, cb)
}

function updateRow (table, rb, cb) {
    var pairs = ""
    for (field of schema[table].slice(1)) {
        if (pairs) {
            pairs += ", "
        }
        pairs += `${field} = '${escape(rb[field])}'`
    }
    let sql = `updat ${table} set ${pairs} where id = ?`
    db.run(sql, rb['id'], cb)
}

function deleteRow (table, id, cb) {
    let sql = `delete from ${table} where id = ${id}`
    db.run(sql, cb)
}

module.exports = {
    createRow,
    updateRow,
    readTable,
    deleteRow,
    schema
}