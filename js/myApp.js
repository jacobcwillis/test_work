var myApp = angular.module('myApp', [])

myApp.controller('myController', function myController($scope) {
    $scope.items = {
        "label": "Item1"
    }
})