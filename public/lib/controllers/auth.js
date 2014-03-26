/* global angular */
'use strict';

/* Controllers */

angular.module('oysterdemo')
.controller('LoginCtrl',
['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {

    
    $scope.login = function() {
        Auth.login({
                username: $scope.username,
                password: $scope.password
               
            },
            function(res) {
                $rootScope.user = Auth.Session;
                $location.path('/');
            },
            function(err) {
                $rootScope.error = "Failed to login";
            });
    };
}]);


