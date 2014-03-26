
var DB = require("./db").DB;

var model = DB.Model.extend({
    tableName: 'users',
    idAttribute: "user_id",
});

model.prototype.getUser = function getUser(user_id){
    
    return DB.where("user_id","=", user_id)
    .fetch()
    .then(function(result){
        return result;
    });
};

module.exports = {
    Model: model
};

