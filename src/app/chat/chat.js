(function (module) {

    // As you add controllers to a module and they grow in size, feel free to place them in their own files.
    //  Let each module grow organically, adding appropriate organization and sub-folders as needed.
    
    module.factory("Auth", ["$firebaseAuth",
        function ($firebaseAuth) {
            var ref = new Firebase("https://torrid-inferno-978.firebaseio.com");
            return $firebaseAuth(ref);
        }
    ]);


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


    module.controller('AuthCtrl', [
        '$scope', 'Auth', function ($scope, Auth) {

            $scope.login = function () {
                $scope.authData = null;
                $scope.error = null;

                Auth.$authWithPassword({
                    email: $scope.email,
                    password: $scope.password
                }).then(function (authData) {
                    //$scope.message = "User logged in with uid: " + authData.uid;
                    console.log('Logged in with uid:' + authData.uid);
                }).catch(function (error) {
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

            $scope.auth = Auth;
            
            // redirect after log out
            $scope.logout = function () {
                Auth.$unauth();
                console.log('Logged out');
            };
        
            // any time auth status updates, add the user data to scope
            $scope.auth.$onAuth(function (authData) {
                $scope.authData = authData;
            });

            $scope.signUp = function () {
                Auth.$createUser({
                    email: $scope.email,
                    password: $scope.password
                }, function (error, user) {
                    if (!error) {
                        alert.message = '';
                    } else {
                        alert.class = 'danger';
                        alert.message = 'The username and password combination you entered is invalid.';
                    }
                });
            };
        }
    ]);

    module.controller('AlertCtrl', [
        '$scope', function ($scope) {
            $scope.alert = {};
        }
    ]);
    
    
    module.controller('chatCtrl', ['$scope', 'Message', 'Auth', function ($scope, Message, Auth) {
        $scope.user = "Guest";

        $scope.messages = Message.all;

        $scope.inserisci = function (message) {
            Message.create(message);
        };
    }]);


    // The name of the module, followed by its dependencies (at the bottom to facilitate enclosure)
} (angular.module("NattypARK.chat")));