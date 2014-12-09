function printInventory(tags) {
  var itemsInfos = new CartItemDao(tags);
  //var inventroyText = getInventroyText(cartItems);
  var cartItems = itemsInfos.getCartItems();
  console.log(cartItems);
}
