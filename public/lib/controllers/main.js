/* global angular */
/* global _ */
'use strict';

/* Controllers */

angular.module('oysterdemo')
.controller('MainCtrl',
['$rootScope', '$scope','$location', 'Auth', function($rootScope, $scope, $location,  Auth) {

    $rootScope.user = [];
    $scope.logout = function() {
        Auth.logout(
            function(success) {
                $rootScope.user = Auth.Session;
                $location.path("/login");
            },
            function(err) {
                $rootScope.error = "Failed to logout";
            });
    };
    
    $scope.upperNavItems = [
                            { url: '/', title: 'Home' , name: 'home' },
                            { url: '/user', title: 'Users' , name: 'user'},
                            { url: '/myprofile', title: 'My Profile', name: 'myprofile'}
                    ];
                    
    $scope.upperNavSelectedItem = "";
    
    $scope.templateUserUrl = function() {
        return "/views/partials/user.html";
    };
    
    var left_nav_items = [ 
        {
            source_name : "home",
            nav_items : [
                { url: '/process', title: 'Processes' , name: 'processes'}
            ]
        },
        {
            source_name : "user",
            nav_items : [
                { url: '/profile', title: 'User Profile' , name: 'userprofile'}
            ]
        },
        {
            source_name : "myprofile",
            nav_items : []
        }
    ];
    
    $scope.leftNavItems = [];
    
    $scope.getLeftNavItems = function(upper_nav_item){
        
        var items = [];
        if(upper_nav_item){
            angular.forEach(left_nav_items, function(item){
                if(item.source_name == upper_nav_item.name){
                    items = item.nav_items;
                }
            });    
        }
        return items;
    };
    
    function detectRoute() {
        angular.forEach($scope.upperNavItems, function(item) {
            console.log($location.path());
            // item.active = $location.path().match(new RegExp(item.url)) ? true : false;
            item.active = $location.path() == item.url ? true : false;
            if(item.active){
                $scope.upperNavSelectedItem = item;
                $scope.leftNavItems = $scope.getLeftNavItems(item);
            }
        });         
    }

    $scope.$on('$routeChangeSuccess', detectRoute);
}]);


