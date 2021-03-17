var myList = angular.module('myList', []);

myList.config(function () {
    // The config function is fired once per page load and is used to define
    // global app behaviour, it is most often used for managing Network events
    // and global state / routing tools

});
myList.constant('CATEGORIES', ['work', 'social', 'home', 'misc.'])

myList.controller('todoController', todoController);
todoController.$inject = ['$scope', '$rootScope', '$http', 'CATEGORIES'];

myList.controller('navController', navController);
navController.$inject = ['$scope', '$rootScope'];

myList.controller('notesController', notesController);
notesController.$inject = ['$scope', '$rootScope'];

myList.controller('editController', editController);
editController.$inject = ['$scope', '$rootScope', '$http'];

myList.controller('listController', listController);
listController.$inject = ['$scope', '$rootScope'];

myList.controller('headerController', headerController);
headerController.$inject = ['$scope', '$rootScope'];

myList.controller('calendarController', calendarController);
calendarController.$inject = ['$scope', '$rootScope'];

function ListObject(id, label, notes, category, date) {
    this.id = id;
    this.label = label;
    this.notes = notes;
    this.category = category;
    this.date = date;
    this.dateContr;
    this.text;
}

function todoController($scope, $rootScope, $http, CATEGORIES) {
    $rootScope.categoryLegend = CATEGORIES;
    $rootScope.view = 1; //view at 0,1,2,3 respectively displays calendar, list, notes, edit
    $rootScope.storedView = $rootScope.view; //for handling enter/leave edit view from other views
    $rootScope.viewTitles = ["Calendar", "Daily Entries", "Notes", "Edit"]
    $rootScope.items = [];
    $rootScope.itemCount = $scope.items.length;

    $rootScope.selectedItem = undefined;
    $rootScope.selectedItemID = undefined;
    $rootScope.search = false;
    $rootScope.searchFilter = undefined;
    $rootScope.categoryFilter = undefined;
    $rootScope.dateFilter = undefined;

    $rootScope.activeDays = [];

    $rootScope.api = "http://localhost:3000";
    // $http.get($rootScope.api + "/readdata").then(function (response) {
    //     console.log(response.data);
    //     $rootScope.items = response.data;
    // });
}

function headerController($scope, $rootScope) {

    $scope.openSearch = function () {
        $rootScope.search = true; //search bar header

    }

    $scope.cancelSearch = function () {
        $rootScope.search = false;
        $rootScope.searchFilter = undefined;
        $rootScope.categoryFilter = undefined;
    }

    $scope.editItem = function () {
        $rootScope.storedView = $rootScope.view;
        $rootScope.view = 3;
        for (var i = 0; i < $rootScope.items.length; i++) {
            if ($rootScope.items[i].id == $rootScope.selectedItemID) {
                $rootScope.selectedItem = $rootScope.items[i];
            }
        };
    }
}

function calendarController($scope, $rootScope) {
    const fp = flatpickr(document.getElementById("calendar"), { inline: true, dateFormat: "m/d" });

    $scope.searchDate = function () {
        $rootScope.view = 1;
        $rootScope.search = true;
    }

}

function listController($scope, $rootScope) {
    $scope.addItem = function () {
        $rootScope.itemCount++;
        $rootScope.selectedItemID = $rootScope.itemCount;
        $rootScope.storedView = $rootScope.view;
        $rootScope.view = 3; //edit view
        var _label = "Entry #" + $rootScope.selectedItemID;
        var _notes = "Notes #" + $rootScope.selectedItemID;
        var _date = new Date();
        var _category = $rootScope.categoryLegend[3];
        $rootScope.selectedItem = new ListObject($rootScope.selectedItemID, _label, _notes, _category, _date);

    }

    $scope.selectItem = function (itemID) {
        console.log("slected itemID: ", itemID);
        $rootScope.selectedItemID = itemID;
    }
}

function notesController($scope, $rootScope) {
    $scope.selectItem = function (itemID) {
        console.log("slected itemID: ", itemID);
        $rootScope.selectedItemID = itemID;
    }

}

function editController($scope, $rootScope, $http) {

    $scope.closeEditor = function () {
        //filters cleared
        $rootScope.search = false;
        $rootScope.searchFilter = undefined;
        $rootScope.categoryFilter = undefined;

        //functional fields populated
        $rootScope.selectedItem.text = $rootScope.selectedItem.label + $rootScope.selectedItem.notes;
        $rootScope.selectedItem.dateContr = ( //formats mm/dd string
            ($rootScope.selectedItem.date.getMonth() + 1) < 10 ?
                "0" + ($rootScope.selectedItem.date.getMonth() + 1) : ($rootScope.selectedItem.date.getMonth() + 1))
            + "/" + ($rootScope.selectedItem.date.getDate() < 10 ?
                "0" + $rootScope.selectedItem.date.getDate() : $rootScope.selectedItem.date.getDate());

        //adds dateContr if not already in activeDates
        if (!$rootScope.activeDays.length) {
            $rootScope.activeDays.push($rootScope.selectedItem.dateContr);
        } else {
            var n = 0;
            for (var i = 0; i < $rootScope.activeDays.length; i++) {
                if ($rootScope.activeDays[i] == $rootScope.selectedItem.dateContr) {
                    n++;
                }
            }
            if (n == 0) {
                $rootScope.activeDays.push($rootScope.selectedItem.dateContr);
            }
        }

        //date selected for default view
        $rootScope.dateFilter = $rootScope.selectedItem.dateContr;

        //this block handles edited entries
        for (var i = 0; i < $rootScope.items.length; i++) {
            if ($rootScope.items[i].id == $rootScope.selectedItemID) {
                console.log("editing item: ", $rootScope.selectedItem);
                $rootScope.items[i] = $rootScope.selectedItem;
                $rootScope.view = $rootScope.storedView;
                $rootScope.selectedItem = undefined;
                $rootScope.selectedItemID = undefined;
                $http.post($rootScope.api + "/writedata", $rootScope.items);  //writes $rootScope.items as "undefined"

                return;
            }
        }
        //this block handles new entries
        console.log("adding new item: ", $rootScope.selectedItem);
        $rootScope.items.push($rootScope.selectedItem);
        $rootScope.view = $rootScope.storedView;
        $rootScope.selectedItem = undefined;
        $rootScope.selectedItemID = undefined;
        $http.post($rootScope.api + "/writedata", $rootScope.items);
        


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


