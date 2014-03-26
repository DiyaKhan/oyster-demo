
var db = global.Packages.Oyster.Model.initialize({
        client : "mysql",
        host: "localhost",
        port: "3306",
        db: "test",
        uid: "root",
        pwd: "root"
    });

module.exports = {
    DB: db
};