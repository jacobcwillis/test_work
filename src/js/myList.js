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
navController.$inject = ['$scope', '$rootScope'];
myList.controller('editController', editController);
navController.$inject = ['$scope', '$rootScope'];


function ListObject(id, label, notes, categories, selected) {
    this.id = id;
    this.label = label;
    this.notes = notes;
    this.categories = categories;
    this.date = date;
}

function todoController($scope, $rootScope, CATEGORIES) {
    $scope.categories = CATEGORIES;
    $rootScope.view = 1; //view at 0,1,2,3 respectively displays calendar, list, notes, edit
    $rootScope.items = [];
    $rootScope.itemCount = $scope.items.length();
    
    

    
}

function notesController($scope, $rootScope) {
    $scope.header = 0; //default notes header

    $scope.openSearch = function () {
        $scope.header = 1; //search bar header
    }
}

function editController($scope, $rootScope) {
    $scope.addItemCategory = [];

    $scope.submitItem = function () {
        var _listObject = new ListObject();
    }
}

function navController($scope, $rootScope) {
    $scope.calendarPressed = function () {
        $rootScope.view = 0;
        console.log('calendar');
    }
    $scope.listPressed = function () {
        $rootScope.view = 1;
        console.log('list');
    }
    $scope.notesPressed = function () {
        $rootScope.view = 2;
        console.log('notes');
    }
}


