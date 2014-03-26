/* global angular */

angular.module('oysterdemo')  
.directive('rights', ['$rootScope', 'Auth', function($rootScope, Auth) {
    return {
        link: function(scope, element, attrs) {
            var display_val = element.css('display');
            
            $rootScope.$watch('user', function(user) {
                if(!Auth.isAuthorized(attrs.rights))
                    element.css('display', 'none');
                else
                    element.css('display', display_val);    
            });
            
            
        }
    }
}]);