function printInventory(tags) {
  var cartItems = CartItem.getCartItems(tags);
  var cart = new Cart();

  var inventoryInfos = new Inventory(cartItems);
  var inventoryText = inventoryInfos.getInventoryText();
  console.log(inventoryText);
}
