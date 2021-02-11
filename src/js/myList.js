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



function ListObject(id, label, notes, categories, selected) {
    this.id = id;
    this.label = label;
    this.notes = notes;
    this.categories = categories;
}

function todoController($scope, $rootScope, CATEGORIES) {
    $scope.categories = CATEGORIES;
    $scope.calendarView = false;
    $scope.listView = true;
    $scope.notesView = false;
    $scope.editView = false;
    $scope.items = [];
    $scope.itemCount = $scope.items.length;
    

    
}

function navController($scope, $rootScope) {
    $scope.calendarPressed = function () {
        $scope.notesView = false;
        $scope.listView = false;
        $scope.calendarView = true;
        console.log('calendar');
    }
    $scope.listPressed = function () {
        $scope.calendarView = false;
        $scope.notesView = false;
        $scope.listView = true;
        console.log('list');
    }
    $scope.notesPressed = function () {
        $scope.listView = false;
        $scope.calendarView = false;
        $scope.notesView = true;
        console.log('notes');
    }
}


