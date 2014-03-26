/* global angular */
/* global routingConfig */
/* global _ */
'use strict';

angular.module('oysterdemo')
.factory('Auth', function($http, $cookieStore){

    var current_user;
    current_user = $cookieStore.get("jsession");
    
    return {
        
        initSession : function (user){
            
            current_user = user;
            $cookieStore.put("jsession",user);
            this.Session = current_user;
        },
        
        login: function(login_obj, success, error) {
            var self = this;
            $http.post('/login', login_obj).success(function(user_obj){
                self.initSession(user_obj) ;
                success(true);
            }).error(error);
        },
        
        logout: function(success, error) {
            var self = this;
            $http.get('/logout?access_token=' + current_user.access_token).success(function(){
                current_user = undefined; // destroy session
                $cookieStore.remove("jsession");
                delete self.Session;
                success();
            }).error(error);
        },
        
        logoutClient: function() {
            var self = this;
            current_user = undefined; // destroy session
            $cookieStore.remove("jsession");
            delete self.Session;
            return;
        },
        
        isLoggedIn: function(){
            if(current_user){
                return true;
            }
            else{
                return false;
            }
        },
        
        isAuthorized: function(right_name){
            if (right_name === "private"){
                if(current_user){
                    return true;
                }
                else{
                    return false;
                }
            }
            else if (!right_name || right_name === "public"){
                return true;
            }
            else{
                var right = _.find(current_user.rights, function(right){
                    return right.name === right_name;
                });
                
                if(right){
                    return true;
                }
                else{
                    return false;
                }
            }
        },
        
        Session: current_user
    
    };
});
