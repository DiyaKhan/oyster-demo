
var db = global.Packages.Oyster.Model.initialize({
        client : "mysql",
        host: "dev1.socialradar.com",
        port: "3306",
        db: "test",
        uid: "dbuser",
        pwd: "dbuser"
    });

module.exports = {
    DB: db
};