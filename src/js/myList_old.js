var myList_old = angular.module('myList_old', []);

myList_old.config(function () {
    // The config function is fired once per page load and is used to define
    // global app behaviour, it is most often used for managing Network events
    // and global state / routing tools
    
});
myList_old.constant('CATEGORIES', ['work', 'social', 'home', 'misc.']) //initial category is default
myList_old.controller('listController', listController);
listController.$inject = ['$scope', '$rootScope', 'CATEGORIES'];


function ListObject(id, label, category) {
    this.id = id;
    this.label = label;
    this.category = category;
}

function listController($scope, $rootScope, CATEGORIES) {
    $scope.categories = CATEGORIES; //without which the select ng-repeat does not function
    $scope.itemCategory = $scope.categories[0];
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
        $scope.itemCategory = $scope.categories[0];
    }
    
    $scope.deleteButtonClicked = function (index) {
        $scope.items.splice($scope.items.findIndex(checkId, index),1)
    }

    function checkId(item) {
        return item.id == this;
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



