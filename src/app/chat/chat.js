(function (module) {

    // As you add controllers to a module and they grow in size, feel free to place them in their own files.
    //  Let each module grow organically, adding appropriate organization and sub-folders as needed.
    
    


    module.factory('Message', ['$firebaseArray',
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


    module.controller('chatCtrl', ['$scope', 'Message', function ($scope, Message) {
        $scope.user = "Guest";

        $scope.messages = Message.all;

        $scope.inserisci = function (message) {
            Message.create(message);
        };
    }]);

    module.controller('AuthCtrl', [
        '$scope', '$rootScope', '$firebaseAuth', function ($scope, $rootScope, $firebaseAuth) {
            var ref = new Firebase('https://torrid-inferno-978.firebaseio.com');
            $rootScope.auth = $firebaseAuth(ref);

            $scope.signIn = function () {
                $rootScope.auth.$login('password', {
                    email: $scope.email,
                    password: $scope.password
                }).then(function (user) {
                    $rootScope.alert.message = '';
                }, function (error) {
                    if (error = 'INVALID_EMAIL') {
                        console.log('email invalid or not signed up — trying to sign you up!');
                        $scope.signUp();
                    } else if (error = 'INVALID_PASSWORD') {
                        console.log('wrong password!');
                    } else {
                        console.log(error);
                    }
                });
            };

            $scope.signUp = function () {
                $rootScope.auth.$createUser($scope.email, $scope.password, function (error, user) {
                    if (!error) {
                        $rootScope.alert.message = '';
                    } else {
                        $rootScope.alert.class = 'danger';
                        $rootScope.alert.message = 'The username and password combination you entered is invalid.';
                    }
                });
            };
        }
    ]);

    module.controller('AlertCtrl', [
        '$scope', '$rootScope', function ($scope, $rootScope) {
            $rootScope.alert = {};
        }
    ]);


    // The name of the module, followed by its dependencies (at the bottom to facilitate enclosure)
} (angular.module("NattypARK.chat")));