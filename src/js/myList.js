var myList = angular.module('myList', ['ngRoute']);

myList.config(function ($routeProvider) {
    // The config function is fired once per page load and is used to define
    // global app behaviour, it is most often used for managing Network events
    // and global state / routing tools
    $routeProvider
    .when("/daily", {
        template : '../html/daily.html',
        controller : 'listController'
    })
    .when("/notes", {
        template : '../html/notes.html',
        controller : 'notesController'
    })
    .when("/edit", {
        template : '../html/edit.html',
        controller : 'addController'
    })
    .otherwise({
        template : '../index.html',
        controller : 'todoController'
    });

});
myList.constant('CATEGORIES', ['work', 'social', 'home', 'misc.'])

myList.controller('todoController', todoController);
todoController.$inject = ['$scope', '$rootScope', '$http', '$location', 'CATEGORIES'];

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

myList.controller('addController', addController);
addController.$inject = ['$scope', '$rootScope'];

function ListObject(id, label, notes, category, date, text, dateContr) {
    this.id = id;
    this.label = label;
    this.notes = notes;
    this.category = category;
    this.date = date;
    this.text = text;
    this.dateContr = dateContr;

}

function todoController($scope, $rootScope, $http, $location, CATEGORIES) {
    $rootScope.categoryLegend = CATEGORIES;
    $rootScope.view = 0; //view at 0,1,2,3 respectively displays new item, list, notes, edit
    $rootScope.views = ['add','daily', 'notes', 'edit'];
    $rootScope.storedView = $rootScope.view; //for handling enter/leave edit view from other views
    $rootScope.viewTitles = ["New Item", "Daily Entries", "Notes", "Edit"]
    // $rootScope.items = [
    //     {
    //         "id": 1,
    //         "label": "Entry #1",
    //         "notes": "Notes #1",
    //         "category": "misc.",
    //         "date": "2021-03-23T18:42:12.292Z",
    //         "text": "Entry #1Notes #1",
    //         "dateContr": "03/23"
    //     },
    //     {
    //         "id": 2,
    //         "label": "Entry #2",
    //         "notes": "Notes #2",
    //         "category": "misc.",
    //         "date": "2021-03-23T18:42:14.126Z",
    //         "text": "Entry #2Notes #2",
    //         "dateContr": "03/23"
    //     }
    // ];
    $rootScope.items = [];

    $rootScope.location = $location;
    $rootScope.$watch('location.search()', function() {
        $rootScope.card = $location.search().card;
    }, true);

    $rootScope.changeCard = function(day) {
        $location.search('card', day);
    }

    // $rootScope.changePage = function(name) {
    //     $location.search('page', name);
    // } 

    $rootScope.$watch('items', function(newItems, oldItems) {
        $rootScope.itemCount = $rootScope.items.length;
    });



    $rootScope.selectedItem = undefined;
    $rootScope.selectedItemID = undefined;
    $rootScope.search = false;
    $rootScope.searchFilter = undefined;
    $rootScope.categoryFilter = undefined;
    $rootScope.dateFilter = undefined;
    $rootScope.dataLoaded = false;
    $rootScope.activeDays = [];
    $rootScope.itemCount = 0;

    $rootScope.addDate = function (day) { //safe function to add any date to the activeDays, repeat dates are accepted but not re-added, additions are sorted.
        $rootScope.addDateHelper(day, $rootScope.activeDays.length - 1); //index of last item
    }

    $rootScope.addDateHelper = function (day, index) {
        if (index < 0) {
            $rootScope.activeDays.splice(0, 0, day); //insert at beginning of array
            return;
        }
        if ($rootScope.dayCompare(day, $rootScope.activeDays[index]) > 0){ // day comes after aD[index]
            $rootScope.activeDays.splice(index + 1, 0, day);
            return;
        }
        if ($rootScope.dayCompare(day, $rootScope.activeDays[index]) < 0){ // day comes before aD[index]
            $rootScope.addDateHelper(day, index-1);
        }
    }

    $rootScope.dayCompare = function (a, b) { //a>b 1, a=b 0, a<b -1
        if (parseInt(a.substring(0,2)) > parseInt(b.substring(0,2))) {
            return 1;
        }
        if (parseInt(a.substring(0,2)) < parseInt(b.substring(0,2))) {
            return -1;
        }
        if (parseInt(a.substring(3,5)) > parseInt(b.substring(3,5))) {
            return 1;
        }
        if (parseInt(a.substring(3,5)) < parseInt(b.substring(3,5))) {
            return -1;
        }
        return 0;
    }

    $rootScope.api = "http://localhost:3000";
    $http.get($rootScope.api + "/readdata").then(function (response) {

        if (response.data) {
            var _data = response.data;
            for (var i = 0; i < _data.length; i++) {
                _data[i].date = new Date(_data[i].date); //thank you, javascript/JSON dates
                $rootScope.items.push(new ListObject(_data[i].id, _data[i].label, _data[i].notes, _data[i].category, _data[i].date, _data[i].text, _data[i].dateContr));
                $rootScope.addDate(_data[i].dateContr);
                
            }
            $rootScope.itemCount = $rootScope.items.length; 
            
        }
        
    });

    

    
}

function headerController($scope, $rootScope) {
    
    $rootScope.openSearch = function () {
        $rootScope.search = true; //search bar header

    }

    $rootScope.cancelSearch = function () {
        $rootScope.search = false;
        $rootScope.searchFilter = undefined;
        $rootScope.categoryFilter = undefined;
    }

    $rootScope.editItem = function () {
        $rootScope.storedView = $rootScope.view;
        $rootScope.view = 3;
        //$rootScope.changePage('edit');
        for (var i = 0; i < $rootScope.items.length; i++) {
            if ($rootScope.items[i].id == $rootScope.selectedItemID) {
                $rootScope.selectedItem = $rootScope.items[i];
            }
        };
    }
}

function addController($scope, $rootScope) {
    $scope.addItem = function () {
        $rootScope.itemCount++;
        $rootScope.selectedItemID = $rootScope.itemCount;
        $rootScope.storedView = $rootScope.view;
        $rootScope.view = 3; //edit view
        //$rootScope.changePage($rootScope.views[$rootScope.view]);
        var _label = "Entry #" + $rootScope.selectedItemID;
        var _notes = "Notes #" + $rootScope.selectedItemID;
        var _date = new Date();
        var _category = $rootScope.categoryLegend[3];
        $rootScope.selectedItem = new ListObject($rootScope.selectedItemID, _label, _notes, _category, _date, undefined, undefined);

    }

}

function listController($scope, $rootScope) {
    

    $scope.cycleDate = function (day) {
        var index = $rootScope.activeDays.indexOf(day);
        $rootScope.dateFilter = $rootScope.activeDays[index];
        $rootScope.changeCard($rootScope.dateFilter);
    }

    $scope.selectItem = function (itemID) {
        console.log("slected itemID: ", itemID);
        $rootScope.selectedItemID = itemID;
    }
}

function notesController($scope, $rootScope) {
    console.log($rootScope.items);
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
        $rootScope.addDate($rootScope.selectedItem.dateContr);
        

        //date selected for default view
        $rootScope.dateFilter = $rootScope.selectedItem.dateContr;

        //this block handles edited entries
        for (var i = 0; i < $rootScope.items.length; i++) {
            if ($rootScope.items[i].id == $rootScope.selectedItemID) {
                console.log("editing item: ", $rootScope.selectedItem);
                $rootScope.items[i] = $rootScope.selectedItem;
                $rootScope.view = $rootScope.storedView;
                //$rootScope.changePage($rootScope.views[$rootScope.view]);
                $rootScope.selectedItem = undefined;
                $rootScope.selectedItemID = undefined;
                $http.post($rootScope.api + "/writedata", $rootScope.items);  //writes ", [Object object]" * length
                return;
            }
        }
        //this block handles new entries
        console.log("adding new item: ", $rootScope.selectedItem);
        $rootScope.items.push($rootScope.selectedItem);
        $rootScope.view = $rootScope.storedView;
        //$rootScope.changePage($rootScope.views[$rootScope.view]);
        $rootScope.selectedItem = undefined;
        $rootScope.selectedItemID = undefined;
        $http.post($rootScope.api + "/writedata", $rootScope.items);



    }


}

function navController($scope, $rootScope) {
    $scope.calendarPressed = function () {
        //$rootScope.changePage('add');
        $rootScope.view = 0;
    }
    $scope.listPressed = function () {
        //$rootScope.changePage('daily');
        $rootScope.view = 1;
        //console.log($rootScope.activeDays);
    }
    $scope.notesPressed = function () {
        //$rootScope.changePage('notes');
        $rootScope.view = 2;
    }
}


