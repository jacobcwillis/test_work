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
    $scope.itemCount = 0; //functional variable controlling insert location for new item
    $scope.listNumber = $scope.itemCount; //cosmetic variable controlling the X in "List Object X"; never decrements to avoid repeat objects.

    $scope.buttonClicked = function () {
        $scope.itemCount++;
        $scope.listNumber++;
        console.log($scope.itemCount);
        if ($scope.itemCount) {
            if ($scope.itemLabel) {
                $scope.loadItem = $scope.itemLabel;
            } else {
                $scope.loadItem = 'List Object ';
                $scope.loadItem = $scope.loadItem.concat($scope.listNumber);
            }
            console.log($scope.loadItem);
            //loadItem = {"label":"List Object #"}

            if ($scope.itemCount > 0) { //If an item has been added via click
                if (!$scope.items) {
                    $scope.items = new Array();
                }
                $scope.items[$scope.itemCount - 1] = new ListObject($scope.loadItem, "misc.");
            }
        }
        console.log($scope.itemLabel);
        document.getElementById("list-form").reset();
        $scope.itemLabel = undefined;
    }

    $scope.deleteButtonClicked = function(index) {
        $scope.items.splice(index, 1);
        $scope.itemCount--;
    }

    $scope.deleteAllButtonClicked = function() {
        $scope.items = new Array();
        $scope.itemCount = 0;
        $scope.listNumber = 0; //everything is gone, no chance of duplicates, list number reset.
    }
}