var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(__dirname +'/simple-blog.sqlite', function(err) {
    if (err) {
        console.log("open simple-blog.sqlite fail")
        process.exit(1)
    } else {
      console.log("open simple-blog.sqlite ok")
      db.serialize(function () {
        db.all("select name from sqlite_master where type='table'", function (err, tables) {
            console.log(tables);
        });
    }); 
    }
    
})

module.exports = db;
