(function (module) {

    // As you add controllers to a module and they grow in size, feel free to place them in their own files.
    //  Let each module grow organically, adding appropriate organization and sub-folders as needed.
    
    var ref = new Firebase('https://torrid-inferno-978.firebaseio.com');
    
    module.factory('Message', ['$firebaseArray',
        function ($firebaseArray) {
            
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


    // The name of the module, followed by its dependencies (at the bottom to facilitate enclosure)
} (angular.module("NattypARK.chat")));