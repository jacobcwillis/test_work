var myList = angular.module('myList', []);

myList.config(function () {
    // The config function is fired once per page load and is used to define
    // global app behaviour, it is most often used for managing Network events
    // and global state / routing tools
});

myList.controller('listController', listController);
listController.$inject = ['$scope', '$rootScope'];


const categories = ['work', 'social', 'home', 'misc.'];
const defaultCategory = 3; //misc.

function ListObject(id, label, category) {
    this.id = id;
    this.label = label;
    this.category = category;
}

function listController($scope, $rootScope) {
    $scope.categories = categories; //without which the select ng-repeat does not function
    $scope.itemCategory = categories[defaultCategory];
    $scope.items = [];
    $scope.itemCount = $scope.items.length;

    $scope.buttonClicked = function () {
        $scope.itemCount++;
        if ($scope.itemLabel) {
            var _listObjectLabel = $scope.itemLabel;
        } else {
            var _listObjectLabel = 'List Object ' + $scope.itemCount.toString();
        }
        var _listObject = new ListObject($scope.itemCount, _listObjectLabel, $scope.itemCategory);
        $scope.items.push(_listObject);
        $scope.itemLabel = undefined;
        $scope.itemCategory = categories[defaultCategory];
    }
    
    $scope.deleteButtonClicked = function (index) {
        $scope.items.splice(index, 1);
    }
    
    $scope.deleteAllButtonClicked = function () {
        $scope.items = new Array();
        $scope.itemCount = 0;
    }

    $scope.clearButtonClicked = function () {
        $scope.categoryFilter = undefined;
        $scope.searchFilter = undefined;
    }
    
    
}



