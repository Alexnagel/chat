'use strict';

angular.module('chat.system').controller('SignUpController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': '',
        'link': ''
    }];
    
    $scope.isCollapsed = false;
}]);