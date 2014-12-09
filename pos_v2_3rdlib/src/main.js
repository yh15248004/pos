function printInventory(tags) {
  var itemsInfos = new InputsDao(tags);
  //var inventroyText = getInventroyText(cartItems);
  var cartItems = itemsInfos.getCartItems();
  //console.log(cartItems);
  var inventoryInfos = new Inventory(cartItems);
  var inventoryText = inventoryInfos.getInventoryText();
  console.log(inventoryText);
}
