var myApp = angular.module('myApp', []);

myApp.config(function () {
	// The config function is fired once per page load and is used to define
	// global app behaviour, it is most often used for managing Network events
	// and global state / routing tools
});

myApp.controller('myController', function myController($scope, $http) {
    $http({
        method: 'GET',
        url: 'json/data.json'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response);
        $scope.items = response.data.menuItems;
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
})

myApp.controller('globalHelloWorldController', globalHelloWorldController);
globalHelloWorldController.$inject = ['$scope', '$rootScope'];

function globalHelloWorldController($scope, $rootScope) {
    $rootScope.globalHelloName = 'Global Hello Jeremy Smith';
    $scope.localHelloName = 'Local Hello Jeremy Smith';
}



myApp.controller('localHelloWorldController', localHelloWorldController);
localHelloWorldController.$inject = ['$scope', '$rootScope'];

function localHelloWorldController($scope, $rootScope) {
  //$rootScope.globalHelloName = 'Global Hello John Smith';
  $scope.localHelloName = 'Local Hello John Smith';
}


