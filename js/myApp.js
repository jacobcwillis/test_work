var myApp = angular.module('myApp', []);

myApp.config(function () {
	// The config function is fired once per page load and is used to define
	// global app behaviour, it is most often used for managing Network events
	// and global state / routing tools
});

myApp.controller('myController', function myController($scope) {
    $scope.items = [
        {
            "label": "Header Item 1",
            "url": ""
        },
        {
            "label": "Header Item 2",
            "url": ""
        },
        {
            "label": "Header Item 3",
            "url": ""
        },
        {
            "label": "Header Item 4",
            "url": ""
        }
    ]
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


