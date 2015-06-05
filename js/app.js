var webApp = angular.module('webApp', ['ngRoute'
]);

webApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/projects/c4', {
        templateUrl: './projects/c4/index.html',
      }).
      otherwise({
        redirectTo: '/',
        templateUrl: './views/index.html',
      });
  }]);

