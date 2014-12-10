function Inventory(cart) {
  this.cart = cart;
}

Inventory.prototype.toString = function() {

  return '***<没钱赚商店>购物清单***\n' +
         '打印时间：' + moment().format('YYYY年MM月DD日 HH:mm:ss') + '\n' +
         '----------------------\n' +
         this.cart.getCartItemsText() +
         '----------------------\n' +
         '挥泪赠送商品：\n' +
         this.cart.getPromotionText() +
         '----------------------\n' +
         this.cart.getSummaryText() +
         '**********************';

};
