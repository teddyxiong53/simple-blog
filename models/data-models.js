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
    let sql = `insert into ${table} default values`
    db.run(sql, cb)
}

/*
insertRow('users', {username: 'aa', password: 'aa', email: 'aa', avatar: 'aa'}, function() {
    console.log(arguments)
})
sql:
INSERT INTO users
  ( username, password, email, avatar) 
VALUES 
  ("teddyxiong53", "123456", "1073167306@qq.com", "111"),


对于posts表
insertRow('posts', {title: 'aa', content: 'aa', username: 'aa', userId: 1})
sql
insert into posts (title, content, username, userId) values
("aa", "aa", "aa", 1)

*/
function insertRow (table, row, cb) {
    let sql = ''
    if (table === 'users') {
        sql = `insert into users (username, password, email, avatar) \
        values ("${row.username}", "${row.password}", "${row.email}", "${row.avatar}")`
        db.run(sql, cb)
    } else if (table === 'posts') {
        sql = `insert into posts (title, content, username, userId) \
        values ("${row.title}", "${row.content}", "${row.username}",${row.userId})`
        db.run(sql, cb)
    }
}
/*
select name from users where name = xx limit 1
很明显，这里有sql语句拼接，有sql注入风险，后面再完善。
*/
function queryRow(table, row, cb) {
    let sql = ''
    if (table === 'users') {
        sql = `select username, password, id from users where username = "${row.username}" limit 1`
        // db.run(sql, cb)
        console.log(sql)
        db.all(sql, [], function(err, rows) {
            if (err) {
                console.log('select error', err)
                throw err
            }
            // console.log(rows)
            cb(rows)
        })
    } else if (table === 'posts') {
        sql = `select id, title, content from posts where id = ${row.id}`
        db.all(sql, [], function(err, rows) {
            if (err) {
                console.log('select err', err)
                throw err
            }
            cb(rows)
        })
    }
}
function updateRow (table, rb, cb) {
    var pairs = ""
    for (field of schema[table].slice(1)) {
        if (pairs) {
            pairs += ", "
        }
        pairs += `${field} = '${escape(rb[field])}'`
    }
    let sql = `update ${table} set ${pairs} where id = ?`
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
    schema,
    insertRow,
    queryRow
}