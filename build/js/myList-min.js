var myList=angular.module("myList",[]);function ListObject(e,t,o,r,n){this.id=e,this.label=t,this.notes=o,this.category=r,this.date=n}function todoController(e,t,o){t.categoryLegend=o,t.view=1,t.storedView=t.view,t.items=[],t.itemCount=e.items.length}function headerController(e,t){e.search=!1,e.openSearch=function(){e.search=!0,t.searchFilter=void 0,t.categoryFilter=void 0},e.cancelSearch=function(){e.search=!1,t.searchFilter=void 0,t.categoryFilter=void 0},e.editItem=function(){t.storedView=t.view,t.view=3;for(var e=0;e<t.items.length;e++)t.items[e].id==t.selectedItemID&&(t.selectedItem=t.items[e])}}function listController(e,t){e.addItem=function(){t.itemCount++,t.selectedItemID=t.itemCount,t.storedView=t.view,t.view=3;var e="Entry #"+t.selectedItemID,o="Notes #"+t.selectedItemID,r=new Date,n=t.categoryLegend[3];t.selectedItem=new ListObject(t.selectedItemID,e,o,n,r)}}function notesController(e,t){e.selectItem=function(e){console.log("slected itemID: ",e),t.selectedItemID=e}}function editController(e,t){e.closeEditor=function(){for(var e=0;e<t.items.length;e++)if(t.items[e].id==t.selectedItemID)return console.log("editing item: ",t.selectedItem),t.items[e]=t.selectedItem,void(t.view=t.storedView);console.log("adding new item: ",t.selectedItem),t.items.push(t.selectedItem),t.view=t.storedView}}function navController(e,t){e.calendarPressed=function(){t.view=0},e.listPressed=function(){t.view=1},e.notesPressed=function(){t.view=2}}myList.config(function(){}),myList.constant("CATEGORIES",["work","social","home","misc."]),myList.controller("todoController",todoController),todoController.$inject=["$scope","$rootScope","CATEGORIES"],myList.controller("navController",navController),navController.$inject=["$scope","$rootScope"],myList.controller("notesController",notesController),notesController.$inject=["$scope","$rootScope"],myList.controller("editController",editController),editController.$inject=["$scope","$rootScope"],myList.controller("listController",listController),listController.$inject=["$scope","$rootScope"],myList.controller("headerController",headerController),headerController.$inject=["$scope","$rootScope"];