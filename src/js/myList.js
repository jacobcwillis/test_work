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


function ListObject(id, label, notes, categories) {
    this.id = id;
    this.label = label;
    this.notes = notes;
    this.categories = categories;
    this.date = date;
}

function todoController($scope, $rootScope, CATEGORIES) {
    $scope.categoryLegend = CATEGORIES;
    $rootScope.view = 1; //view at 0,1,2,3 respectively displays calendar, list, notes, edit
    $rootScope.items = [];
    $rootScope.itemCount = $scope.items.length;
    
    

    
}

function notesController($scope, $rootScope) {
    $scope.search = false; //default notes header
    $scope.noteSelected = false;
    

    $scope.openSearch = function () {
        $scope.search = true; //search bar header
    }
    
    $scope.noteSelect = function (id) {
        $scope.noteSelected = true;
        $scope.selected = id;
    }

    $scope.editItem = function (id) {
        for (var i = 0; i < items.length; i++) {
            if(item.id = id) {
                
            }
        }
    }
}

function editController($scope, $rootScope) {
    $scope.addItemCategory = [];

    $scope.submitItem = function () {
        $rootScope.itemCount++;
        _listObject = new ListObject($rootScope.itemCount, itemLabel, itemNotes, addItemCategory);
        $rootScope.items.push(_listObject);
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


