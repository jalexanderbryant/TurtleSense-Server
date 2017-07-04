angular.module('LoginCtrl', []).controller('LoginController', ['$scope', '$resource', function($scope, $resource){
  $scope.tagline = "Login to TurtleSense";

  $scope.login = function(user){
    var payload = {
        username 
    }
    var username = user.username;
    var password = user.password;

  }
}]);