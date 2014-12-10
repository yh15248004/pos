function printInventory(tags) {
  var cartItems = [];
  _.forEach(tags, function(tag) {
    var scan = new Scanner(tag);
    var newCartItem = scan.getCartItem();
    var cart = new Cart();
    cart.cartItems = cartItems;
    cartItems = cart.addCartItem(newCartItem);
  });
  //var cartItems = CartItem.getCartItems(tags);
  var cart = new Cart();
  cart.cartItems = cartItems;

  var inventory = new Inventory(cart);
  console.log(inventory.toString());

}
