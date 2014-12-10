function printInventory(tags) {
  var cartItems = CartItem.getCartItems(tags);

  var cart = new Cart();
  cart.cartItems = cartItems;

  var inventory = new Inventory(cart);
  console.log(inventory.toString());

}
