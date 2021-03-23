var myList=angular.module("myList",[]);function ListObject(e,t,o,l,i){this.id=e,this.label=t,this.notes=o,this.category=l,this.date=i,this.dateContr,this.text}function todoController(e,t,o,l){t.categoryLegend=l,t.view=1,t.storedView=t.view,t.viewTitles=["Calendar","Daily Entries","Notes","Edit"],t.items=[],t.itemCount=e.items.length,t.selectedItem=void 0,t.selectedItemID=void 0,t.search=!1,t.searchFilter=void 0,t.categoryFilter=void 0,t.dateFilter=void 0,t.activeDays=[],t.api="http://localhost:3000",o.get(t.api+"/readdata").then(function(e){console.log(e.data),t.items.push(JSON.parse(e.data))})}function headerController(e,t){e.openSearch=function(){t.search=!0},e.cancelSearch=function(){t.search=!1,t.searchFilter=void 0,t.categoryFilter=void 0},e.editItem=function(){t.storedView=t.view,t.view=3;for(var e=0;e<t.items.length;e++)t.items[e].id==t.selectedItemID&&(t.selectedItem=t.items[e])}}function calendarController(e,t){flatpickr(document.getElementById("calendar"),{inline:!0,dateFormat:"m/d"});e.searchDate=function(){t.view=1,t.search=!0}}function listController(e,t){e.addItem=function(){t.itemCount++,t.selectedItemID=t.itemCount,t.storedView=t.view,t.view=3;var e="Entry #"+t.selectedItemID,o="Notes #"+t.selectedItemID,l=new Date,i=t.categoryLegend[3];t.selectedItem=new ListObject(t.selectedItemID,e,o,i,l)},e.selectItem=function(e){console.log("slected itemID: ",e),t.selectedItemID=e}}function notesController(e,t){e.selectItem=function(e){console.log("slected itemID: ",e),t.selectedItemID=e}}function editController(e,t,o){e.closeEditor=function(){if(t.search=!1,t.searchFilter=void 0,t.categoryFilter=void 0,t.selectedItem.text=t.selectedItem.label+t.selectedItem.notes,t.selectedItem.dateContr=(t.selectedItem.date.getMonth()+1<10?"0"+(t.selectedItem.date.getMonth()+1):t.selectedItem.date.getMonth()+1)+"/"+(t.selectedItem.date.getDate()<10?"0"+t.selectedItem.date.getDate():t.selectedItem.date.getDate()),t.activeDays.length){for(var e=0,l=0;l<t.activeDays.length;l++)t.activeDays[l]==t.selectedItem.dateContr&&e++;0==e&&t.activeDays.push(t.selectedItem.dateContr)}else t.activeDays.push(t.selectedItem.dateContr);t.dateFilter=t.selectedItem.dateContr;for(l=0;l<t.items.length;l++)if(t.items[l].id==t.selectedItemID)return console.log("editing item: ",t.selectedItem),t.items[l]=t.selectedItem,t.view=t.storedView,t.selectedItem=void 0,t.selectedItemID=void 0,void o.post(t.api+"/writedata",t.items);console.log("adding new item: ",t.selectedItem),t.items.push(t.selectedItem),t.view=t.storedView,t.selectedItem=void 0,t.selectedItemID=void 0,o.post(t.api+"/writedata",t.items)}}function navController(e,t){e.calendarPressed=function(){t.view=0},e.listPressed=function(){t.view=1},e.notesPressed=function(){t.view=2}}myList.config(function(){}),myList.constant("CATEGORIES",["work","social","home","misc."]),myList.controller("todoController",todoController),todoController.$inject=["$scope","$rootScope","$http","CATEGORIES"],myList.controller("navController",navController),navController.$inject=["$scope","$rootScope"],myList.controller("notesController",notesController),notesController.$inject=["$scope","$rootScope"],myList.controller("editController",editController),editController.$inject=["$scope","$rootScope","$http"],myList.controller("listController",listController),listController.$inject=["$scope","$rootScope"],myList.controller("headerController",headerController),headerController.$inject=["$scope","$rootScope"],myList.controller("calendarController",calendarController),calendarController.$inject=["$scope","$rootScope"];