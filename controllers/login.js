var LoginFacade = require("../lib/facade/login");

function login(req, res, next) {

    var loginFacade = new LoginFacade();
    
    loginFacade.authenticate(req.getInputObject()).then(function (user_obj) {
        res.send(200, user_obj);
    })
    .catch(function (e) {
        next(e);
    })
    .error(function (e) {
        next(e);
    });

}

function logout(req, res, next){
    
    var loginFacade = new LoginFacade();

    loginFacade.logout().then(function () {
        res.send(200, "");
    })
    .error(function(e){
        next(e);
    });
}

module.exports.login = login;
module.exports.logout = logout;