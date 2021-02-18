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
    $rootScope.items = [];
    $rootScope.itemCount = $scope.items.length;
    $rootScope.selectedItem = undefined;

    // $rootScope.itemLabel = undefined;
    // $rootScope.itemNotes = undefined;
    // $rootScope.itemCategory = undefined;
    // $rootScope.itemDate = undefined;



}

function listController($scope, $rootScope) {
    $scope.addItem = function () {
        $rootScope.itemCount++;
        $rootScope.selectedItem = new ListObject($rootScope.itemCount, "", "", undefined, undefined);
        $rootScope.view = 3; //edit view
    }
}

function notesController($scope, $rootScope) {
    $scope.search = false; //default notes header


    $scope.openSearch = function () {
        $scope.search = true; //search bar header
    }
    $scope.cancelSearch = function () {
        $scope.search = false;
        $scope.searchFilter = undefined;
        $scope.categoryFilter = undefined;
    }

    $scope.editItem = function () {
        
       
            console.log("selected item: " + $rootScope.selectedItem);
            // $rootScope.itemLabel = _item.label; //doesn't work ?
            // $rootScope.itemNotes = _item.notes;
            // $rootScope.itemCategory = _item.category;
            // $rootScope.itemDate = _item.date;
            // console.log($rootScope.itemLabel);
            
            $rootScope.view = 3;
        
    }

}

function editController($scope, $rootScope) {

    $scope.submitItem = function () {
        console.log($rootScope.selectedItem);
        $rootScope.items.push($rootScope.selectedItem);
        
        $rootScope.view = 2;
    }
}

function navController($scope, $rootScope) {
    $scope.calendarPressed = function () {
        $rootScope.view = 0;
        console.log($rootScope.view);
    }
    $scope.listPressed = function () {
        $rootScope.view = 1;
        console.log($rootScope.view);
    }
    $scope.notesPressed = function () {
        $rootScope.view = 2;
        console.log($rootScope.view);
    }
}


