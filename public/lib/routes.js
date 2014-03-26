/* global angular */
'use strict';

angular.module('oysterdemo', ['ngRoute','ngCookies', 'ui.bootstrap'])

    .config(function($routeProvider,$httpProvider) {
        
        $routeProvider.when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl',
            
        })
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'LoginCtrl',
            rights: "private"
        })
        .otherwise({
            redirectTo: '/'
        });
        
        //$q is promise (angular default)
        // intercepting every http call response if it contains error
        // responseError is default interceptor function in httpProvider
        //changing definition of responseError function so we can do some custom logic
        
        $httpProvider.interceptors.push(function($q, $location,$rootScope, $injector) {
            // this function will intercept response Error and if its status is 401 then redirect to login page
            return {
                'responseError': function(response) {
                    if(response.status === 401) {
                        var AuthService = $injector.get('Auth');
                        AuthService.logoutClient();
                        delete $rootScope.user; // deleting user from rootScope because rights directive is looking for that property
                        $location.path('/login');    
                        return $q.reject(response);
                    }
                    else {
                        return $q.reject(response);
                    }
                }
            };
        });
    })
    .run(['$rootScope', '$location', 'Auth', function($rootScope, $location,authService) {

        // register listener to watch route changes
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
          if (!authService.isAuthorized(next.rights)) {
            // user is not authorized check user is logged in or not
            
            // check if user session is alive
            if(authService.isLoggedIn()){
                $location.path( "/home" );
            }
            else{
                $location.path( "/login" );
            }
         }         
        });
    }]);
    
    