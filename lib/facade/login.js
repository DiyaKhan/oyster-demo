// Facade for login operations
var Promise = global.Packages.Promise;
var Login = global.Packages.Oyster.BaseFacade.extend();
var UserModel = require("../models/user").Model;
var Rules = global.Packages.Oyster.Helpers.rules;
var ValidationHelper = global.Packages.Oyster.Helpers.validation;
var UnAuthenticatedError = global.Packages.Oyster.Errors.unAuthenticatedError;

// defining global validation rules

function globalValidationRules() {

    // var rules = new Rules();
    // rules.addMulti([{
    //     "user_id": {
    //         required: true,
    //         int: true
    //     }
    // }, {
    //     "lat": {
    //         lat: true
    //     }
    // }, {
    //     "lon": {
    //         lon: true
    //     }
    // }]);
    // return rules;

}

Login.prototype.authenticate = function authenticate(input) {
    
    var rules = new Rules();
    
    rules.addMulti([{
        "username": {
            required: true
        }
    }, {
        "password": {
            required: true
        }
    }])
    .addCustomSync("password length must be greater than 4", function checkPassword() {
            return (input.password.length > 4) ? true: false;
    });
    
    return ValidationHelper.validate(input, rules).then(function () {
        
        return new UserModel({ "username": input.username, "password": input.password }).fetch();
        
    }).then(function(model){
        if (model) {
            return model;
        }
        else {
           throw new UnAuthenticatedError();
        }
    });
    
};

Login.prototype.logout = function logout() {
    return new Promise(function(resolve){
        resolve();
        return null;
    });
};


module.exports = Login;