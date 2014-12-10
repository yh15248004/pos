function printInventory(tags) {
  var itemsInfos = new InputsDao(tags);
  var cartItems = itemsInfos.getCartItems();
  var inventoryInfos = new Inventory(cartItems);
  var inventoryText = inventoryInfos.getInventoryText();
  console.log(inventoryText);
}
