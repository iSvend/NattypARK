(function (app) {

    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    });

    app.run(function () { });
    app.controller('AppController', function ($scope, $http, Lightbox) {
        $http.get('http://ark-servers.net/api/?object=servers&element=detail&key=pzgtf46r5aoen69dlhj724hmd4hutdizcv').success(function(data) {
            $scope.server = data;
            console.log($scope.server);
        }).error(function(data, status, headers, config) {
            //log error
        });

        $scope.someList = ['Map - The Island', 'PVPVE', '3x Gather(Harvest)', '3x Faster Taming', '3x Experience'];

        init();
        
        function init() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
            console.log($scope.someList);
        }

        $scope.images = [
            {
                'url': '/assets/resource_map.jpg',
                'caption': 'The Island Resource Map',
                'thumbUrl': '/assets/resource_map.jpg' // used only for this example
            }
        ];

        $scope.openLightboxModal = function (index) {
            Lightbox.openModal($scope.images, index);
        };

    });
    app.controller('NavController', function ($scope, $location) {
        $scope.isCollapsed = true;
        $scope.$on('$routeChangeSuccess', function () {
            $scope.isCollapsed = true;
        });
    });

    app.directive('blink', function ($timeout) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function ($scope, $element) {
                function showElement() {
                    $element.css("display", "inline");
                    $timeout(hideElement, 700);
                }

                function hideElement() {
                    $element.css("display", "none");
                    $timeout(showElement, 700);
                }
                showElement();
            },
            template: '<span ng-transclude></span>',
            replace: true
        };
    });
    
} (angular.module("NattypARK", [
    'templates-app',
    'templates-common',
    'ui.router.state',
    'ui.router',
    'bootstrapLightbox',
])));
