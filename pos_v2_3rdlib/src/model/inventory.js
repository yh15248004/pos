function Inventory(cartItems) {
  this.cartItems = cartItems;
}
Inventory.prototype.getInventoryText = function() {
  var inventoryText = '';
  var itemsDao = new CartItemsDao(this.cartItems);
  var cartItemsText = itemsDao.getCartItemsText();
  var promotionText = itemsDao.getPromotionText();
  var summaryText = itemsDao.getSummaryText();
  var currentTime = moment().format('YYYY年MM月DD日 hh:mm:ss');

  inventoryText += '***<没钱赚商店>购物清单***\n' +
  '打印时间：' + currentTime + '\n' +
  '----------------------\n' +
  cartItemsText +
  '----------------------\n' +
  '挥泪赠送商品：\n' +
  promotionText +
  '----------------------\n' +
  summaryText +
  '**********************';
  return inventoryText;
};
