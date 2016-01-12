(function (app) {

    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    });

    app.run(function () { });
    app.controller('AppController', function ($scope) {
        
    });
    app.controller('NavController', function ($scope, $location) {
        $scope.isCollapsed = true;
        $scope.$on('$routeChangeSuccess', function () {
            $scope.isCollapsed = true;
        });
    });

} (angular.module("NattypARK", [
    'NattypARK.home',
    'NattypARK.about',
    'templates-app',
    'templates-common',
    'ui.router.state',
    'ui.router',
    'bootstrapLightbox',
])));
