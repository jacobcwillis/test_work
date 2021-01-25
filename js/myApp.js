console.log("Hello World");

var app = angular.module('testWork', ['ngRoute']);

app.config(function () {
	// The config function is fired once per page load and is used to define
	// global app behaviour, it is most often used for managing Network events
	// and global state / routing tools
});



app.controller('globalHelloWorldController', globalHelloWorldController);
globalHelloWorldController.$inject = ['$scope', '$rootScope'];

function globalHelloWorldController($scope, $rootScope) {
	$rootScope.globalHelloName = 'Global Hello John Smith';
}



app.controller('localHelloWorldController', localHelloWorldController);
localHelloWorldController.$inject = ['$scope', '$rootScope'];

function localHelloWorldController($scope, $rootScope) {
	//$rootScope.globalHelloName = '';
  $scope.localHelloName = 'Local Hello John Smith';
}