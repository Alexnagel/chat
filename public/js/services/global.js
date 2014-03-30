'use strict';

//Global service for global variables
angular.module('chat.system').factory('Global', [function() {
    var _this = this;
    _this._data = {
      user: window.user,
      authenticated: !! window.user
    };

    return _this._data;
  }
]);

angular.module('chat.system').factory('GetUser', ['$resource', function($resource) {
    return $resource('/users/me', null);
}]);