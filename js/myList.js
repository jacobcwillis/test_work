var myList = angular.module('myList', []);

myList.config(function () {
    // The config function is fired once per page load and is used to define
    // global app behaviour, it is most often used for managing Network events
    // and global state / routing tools

});


myList.controller('listController', listController);
listController.$inject = ['$scope', '$rootScope'];

function ListObject(label, category) {
    this.label = label;
    this.category = category;
}

function listController($scope, $rootScope) {
    $scope.categories = ['work', 'social', 'home', 'misc.'];
    $scope.defaultCategory = 3; //misc
    $scope.itemCategory = $scope.categories[$scope.defaultCategory];
    $scope.items = [];
    $scope.itemCount = $scope.items.length;

    $scope.buttonClicked = function () {
        $scope.itemCount++;
        if ($scope.itemLabel) {
            var _listObjectLabel = $scope.itemLabel;
        } else {
            var _listObjectLabel = 'List Object ' + $scope.itemCount.toString();
        }
        var _listObject = new ListObject(_listObjectLabel, $scope.itemCategory);
        $scope.items.push(_listObject);
        $scope.itemLabel = undefined;
        $scope.itemCategory = $scope.categories[$scope.defaultCategory];
    }
    
    $scope.deleteButtonClicked = function (index) {
        $scope.items.splice(index, 1);
    }
    
    $scope.deleteAllButtonClicked = function () {
        $scope.items = new Array();
        $scope.itemCount = 0;
    }
    console.log($scope.categoryFilter);
    console.log($scope.searchFilter);
    
    
}



