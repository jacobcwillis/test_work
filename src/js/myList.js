var myList = angular.module('myList', []);

myList.config(function () {
    // The config function is fired once per page load and is used to define
    // global app behaviour, it is most often used for managing Network events
    // and global state / routing tools

});
myList.constant('CATEGORIES', ['work', 'social', 'home', 'misc.']) //initial category is default

myList.controller('todoController', todoController);
todoController.$inject = ['$scope', '$rootScope', 'CATEGORIES'];

myList.controller('navController', navController);
navController.$inject = ['$scope', '$rootScope'];

myList.controller('notesController', notesController);
notesController.$inject = ['$scope', '$rootScope'];

myList.controller('editController', editController);
editController.$inject = ['$scope', '$rootScope'];

myList.controller('listController', listController);
listController.$inject = ['$scope', '$rootScope'];


function ListObject(id, label, notes, category, date) {
    this.id = id;
    this.label = label;
    this.notes = notes;
    this.category = category;
    this.date = date;
}

function todoController($scope, $rootScope, CATEGORIES) {
    $rootScope.categoryLegend = CATEGORIES;
    $rootScope.view = 1; //view at 0,1,2,3 respectively displays calendar, list, notes, edit
    $rootScope.storedView = $rootScope.view; //for handling enter/leave edit view from other views
    $rootScope.items = [];
    $rootScope.itemCount = $scope.items.length;

    $rootScope.selectedItem = undefined;
    



}

function listController($scope, $rootScope) {
    $scope.addItem = function () {
        $rootScope.itemCount++;
        $rootScope.selectedItemID = $rootScope.itemCount;
        $rootScope.storedView = $rootScope.view;
        $rootScope.view = 3; //edit view

        $rootScope.selectedItem = new ListObject($rootScope.selectedItemID, "", "", undefined, undefined);
        
    }
}

function notesController($scope, $rootScope) {
    $scope.search = false; //default notes header

    $scope.selectedItem = function(itemID){
        console.log("slected itemID: ", itemID);
        $rootScope.selectedItemID = itemID;
    }

    $scope.openSearch = function () {
        $scope.search = true; //search bar header
    }

    $scope.cancelSearch = function () {
        $scope.search = false;
        $scope.searchFilter = undefined;
        $scope.categoryFilter = undefined;
    }

    $scope.editItem = function () {
        $rootScope.storedView = $rootScope.view;
        $rootScope.view = 3;

        for (var i = 0; i < $rootScope.items.length; i++) {
            if($rootScope.items[i].id == $rootScope.selectedItemID){
                $rootScope.selectedItem = $rootScope.items[i];
            }
        };

    }
}

function editController($scope, $rootScope) {

    $scope.closeEditor = function () {
        for (var i = 0; i < $rootScope.items.length; i++) {
            if($rootScope.items[i].id == $rootScope.selectedItemID){
                console.log("editing item: ", $rootScope.selectedItem);
                $rootScope.items[i] = $rootScope.selectedItem;
                $rootScope.view = $rootScope.storedView;
                return;
            }
        }
        console.log("adding new item: ", $rootScope.selectedItem);
        $rootScope.items.push($rootScope.selectedItem);
        $rootScope.view = $rootScope.storedView;
        
    }

    
}

function navController($scope, $rootScope) {
    $scope.calendarPressed = function () {
        $rootScope.view = 0;
    }
    $scope.listPressed = function () {
        $rootScope.view = 1;
    }
    $scope.notesPressed = function () {
        $rootScope.view = 2;
    }
}


