var myApp = angular.module('myApp', [])

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