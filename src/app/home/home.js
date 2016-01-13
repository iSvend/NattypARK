/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * 'src/app/home', however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a 'note' section could have the submodules 'note.create',
 * 'note.delete', 'note.edit', etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 */
(function (module) {
    
    // As you add controllers to a module and they grow in size, feel free to place them in their own files.
    //  Let each module grow organically, adding appropriate organization and sub-folders as needed.
    module.controller('HomeController', function ($scope, $http, Lightbox) {
        // The top section of a controller should be lean and make it easy to see the "signature" of the controller
        //  at a glance.  All function definitions should be contained lower down.
        $http.get('http://ark-servers.net/api/?object=servers&element=detail&key=pzgtf46r5aoen69dlhj724hmd4hutdizcv').success(function(data) {
            $scope.server = data;
            console.log($scope.server);
        }).error(function(data, status, headers, config) {
            //log error
        });
        
        
        var model = this;
        model.serverName = '[US] Natty pARK [PVPVE] 3x Gather, Taming, XP';
        model.someList = ['Map - The Island', 'PVPVE', '3x Gather(Harvest)', '3x Faster Taming', '3x Experience'];
        model.someFunctionUsedByTheHomePage = someFunctionUsedByTheHomePage;

        init();

        function init() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
        }

        function someFunctionUsedByTheHomePage() {
            alert('Congratulations');
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
    
    module.directive('blink', function ($timeout) {
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

    // The name of the module, followed by its dependencies (at the bottom to facilitate enclosure)
} (angular.module("NattypARK.home")));