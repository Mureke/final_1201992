angular.module("starter", ["ionic", "firebase"])

.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://1201992firebase.firebaseio.com/items");
  return $firebaseArray(itemsRef);
})

.controller("ListCtrl", function($scope, Items, $ionicModal) {
  $scope.items = Items;
  
  $scope.addItem = function(value) {
    
   
  }

  $scope.changeStatus = function(){
     if(this.item.deleteAfterPurchase == true){
        $scope.items.$remove(this.item);
     }
     else if(this.item.needed == false){
        this.item.needed = true;
        $scope.items.$save(this.item);
     }else{
        this.item.needed = false;
        $scope.items.$save(this.item);
     }
  }
  
    $scope.deleteItem = function(){
      var r = confirm("Delete " + this.item.name + " from the shopping list?");
      if(r == true){
         $scope.items.$remove(this.item);
      }else{
        return;
      }
  }
  
   // Create our modal
  $ionicModal.fromTemplateUrl('new-item.html', function(modal) {
    $scope.itemModal = modal;
  }, {
    scope: $scope
  });

  //Create items
  $scope.createItem = function(item){
    if(!item){
      return;
    }
    else{
         if(!item.deleteAfterPurchase){
           item.deleteAfterPurchase = false;
         }
         var needed = false;
         $scope.items.$add({
            "name": item.name,
            "needed": needed,
            "deleteAfterPurchase": item.deleteAfterPurchase
         });
      }
    }

  $scope.newItem = function() {
    $scope.itemModal.show();
  };

  $scope.closeNewItem = function() {
    $scope.itemModal.hide();
  }
});