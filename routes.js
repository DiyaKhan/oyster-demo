// this file contains all the routes 

var //access_token_validator = require("./middleware/accesstoken"),
homeController = require("./controllers/home"),
loginController = require("./controllers/login");

module.exports = routes;

function routes(app){
    
    /* ******************** HOME Controller ********************* */
    app.get("/", homeController.index);
    app.get("/partials/*", homeController.view);
    
    /* ******************** Login Controller ********************* */
    app.post("/login", loginController.login);
    app.get("/logout", loginController.logout);
    
}