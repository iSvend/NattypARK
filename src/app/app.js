(function (app) {

    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    });

    app.run(function () { });
    
    // this factory returns a synchronized array of chat messages
    app.factory('chatMessages', ['$firebaseArray',
        function ($firebaseArray) {
            // create a reference to the database location where we will store our data
            var randomRoomId = Math.round(Math.random() * 100000000);
            var ref = new Firebase("https://torrid-inferno-978.firebaseio.com/" + randomRoomId);

            // this uses AngularFire to create the synchronized array
            return $firebaseArray(ref);
        }
    ]);

    app.controller('ChatCtrl', ['$scope', 'chatMessages',
        // we pass our new chatMessages factory into the controller
        function ($scope, chatMessages) {
            $scope.user = "Guest " + Math.round(Math.random() * 100);

            // we add chatMessages array to the scope to be used in our ng-repeat
            $scope.messages = chatMessages;

            // a method to create new messages; called by ng-submit
            $scope.addMessage = function () {
                // calling $add on a synchronized array is like Array.push(),
                // except that it saves the changes to our database!
                $scope.messages.$add({
                    from: $scope.user,
                    content: $scope.message
                });

                // reset the message input
                $scope.message = "";
            };

            // if the messages are empty, add something for fun!
            $scope.messages.$loaded(function () {
                if ($scope.messages.length === 0) {
                    $scope.messages.$add({
                        from: "Natty Admin",
                        content: "Hi! I'm looking for your feedback and issues."
                    });
                }
            });
        }
    ]);

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
    'firebase',
])));
