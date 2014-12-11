function printInventory(tags) {
  var cart = new Cart();
  
  var scan = new Scanner();

  _.forEach(tags, function(tag) {
    cart.addCartItem(scan.getCartItem(tag));
  });

  var inventory = new Inventory(cart);
  console.log(inventory.toString());
}
