function listController($scope, $rootScope) {
    $scope.items = [];
    $scope.itemCount = $scope.items.length; //functional variable controlling insert location for new item

    $scope.buttonClicked = function () {
        $scope.itemCount++;

        // // Option 1
        var _listObjectLabel = 'List Object ' + $scope.itemCount.toString();
        var _listObject = new ListObject(_listObjectLabel, "misc");
        $scope.items.push(_listObject);

        // // Option 2
        // var _listObject = new ListObject('List Object ' + $scope.itemCount, "misc");
        // $scope.items.push(_listObject);

        // // Option 3 (my personal favorite)
        // $scope.items.push({
        //     label: 'List Object ' + $scope.itemCount,
        //     category: "misc"
        // });

    }

    $scope.deleteButtonClicked = function(index) {
        $scope.items.splice(index, 1);
    }

    $scope.deleteAllButtonClicked = function() {
        $scope.items = new Array();
        $scope.itemCount = 0;
    }
}