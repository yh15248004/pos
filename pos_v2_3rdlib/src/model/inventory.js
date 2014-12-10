function Inventory(cart) {
  this.cart = cart;
}

Inventory.prototype.toString = function() {
  var inventoryText = '';
  var currentTime = moment().format('YYYY年MM月DD日 HH:mm:ss');

  inventoryText += '***<没钱赚商店>购物清单***\n' +
  '打印时间：' + currentTime + '\n' +
  '----------------------\n' +
  this.cart.getCartItemsText() +
  '----------------------\n' +
  '挥泪赠送商品：\n' +
  this.cart.getPromotionText() +
  '----------------------\n' +
  this.cart.getSummaryText() +
  '**********************';
  return inventoryText;
};
