var UserFacade = global.Packages.Oyster.BaseFacade.extend();
var UserModel = require("../models/user").Model;

// defining global validation rules
UserFacade.prototype.validationRules = function validationRules() {
    return {
        default: [{
            "user_id": {
                required: true,
                int: true
            }
        }]
    };
};

UserFacade.prototype.get = function get(input){
    //this.rules = [{default: { "user_id" : { required: true }}}];
    
    this.validate(input).then(function(){
        
        return new UserModel({ "user_id": this.user_id}).fetch();
        
    }).then(function(model){
        if (model) {
            return model;
        }
        else {
           return "failed";
        }
    });
};


module.exports = UserFacade;
