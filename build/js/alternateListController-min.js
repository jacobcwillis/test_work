function listController(t,e){t.items=[],t.itemCount=t.items.length,t.buttonClicked=function(){t.itemCount++;var e="List Object "+t.itemCount.toString(),i=new ListObject(e,"misc");t.items.push(i)},t.deleteButtonClicked=function(e){t.items.splice(e,1)},t.deleteAllButtonClicked=function(){t.items=new Array,t.itemCount=0}}