function printInventory(tags) {
  var cart = new Cart();

  var scanner = new Scanner();

  _.forEach(tags, function(tag) {
    cart.addCartItem(scanner.getCartItem(tag));
  });

  var inventory = new Inventory(cart);
  console.log(inventory.toString());
}
