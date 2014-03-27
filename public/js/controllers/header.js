'use strict';

angular.module('chat.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': '',
        'link': ''
    }];
    
    $scope.isCollapsed = false;
}]);