// Angular App Routing

angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
    
    // Route the root and /login to the Login view
    .when('/',{
      templateUrl: 'views/pages/login.ejs',
      controller: 'LoginController'

    })
    .when('/login', {
      templateUrl: 'views/pages/login.ejs',
      controller: 'LoginController'
    })
    .when('/about', {
        templateUrl: 'views/pages/about.ejs',
        controller: 'AboutController'
    })
    .when('/register', {
        templateUrl: 'views/pages/register.ejs',
        controller: 'RegisterController'
    });
  

    $locationProvider.html5Mode(true);
}]);