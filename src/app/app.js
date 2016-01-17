(function (app) {

    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    });

    app.run(function () { });
    app.controller('AppController', function ($scope, $http, Lightbox) {
        $http.get('http://ark-servers.net/api/?object=servers&element=detail&key=pzgtf46r5aoen69dlhj724hmd4hutdizcv').success(function (data) {
            $scope.server = data;
            console.log($scope.server);
        }).error(function (data) {
            //log error
        });

        $http.get('https://api.ark.bar/v1/version').success(function (data) {
            $scope.version = data;
            console.log($scope.version);
        }).error(function (data) {
            //error
        });

        $scope.someList = ['Map - The Island', 'PVPVE', '5x Gather(Harvest)', '5x Faster Taming', '5x Experience'];

        init();

        function init() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
            console.log($scope.someList);
        }

        $scope.images = [
            {
                'url': 'http://res.cloudinary.com/isvend/image/upload/v1452907506/resource_map_vqt3am.jpg',
                'caption': 'The Island Resource Map',
                'thumbUrl': 'http://res.cloudinary.com/isvend/image/upload/v1452907506/resource_map_vqt3am.jpg' // used only for this example
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

    app.controller('chatCtrl', ['$scope', 'Message', function ($scope, Message) {
        $scope.user="Guest";
 
		$scope.messages= Message.all;
 
		$scope.inserisci = function(message){
			Message.create(message);
		};
    }]);

    app.factory('Message', ['$firebaseArray',
        function ($firebaseArray) {
            var ref = new Firebase('https://torrid-inferno-978.firebaseio.com');
            var messages = $firebaseArray(ref.child('messages'));
            var Message = {
                all: messages,
                create: function (message) {
                    return messages.$add(message);
                },
                get: function (messageId) {
                    return $firebaseObject(ref.child('messages').child(messageId));
                },
                delete: function (message) {
                    return messages.$remove(message);
                }
            };
            return Message;
        }
    ]);

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
    'firebase'
])));
