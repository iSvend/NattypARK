angular.module('services')

.service('VersionService', function($http, AppService) {
    this.getVersion = function() {
        return $http.get('https://api.ark.bar/v1/version');
    };
});