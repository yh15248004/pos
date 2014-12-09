function CartItemsDao(cartItems) {
  this.cartItems = cartItems;
}
CartItemsDao.prototype.getCartItemsText = function() {
  var cartItems = this.cartItems;
  var cartItemsText = '';

  _.forEach(cartItems,function(cartItem) {

    var itemDao = new CartItemDao(cartItem);
    var subTotal = itemDao.getSubTotal();
    cartItemsText += '名称：' + cartItem.getName() +
    '，数量：' + cartItem.getCount() + cartItem.getUnit() +
    '，单价：' + cartItem.getPrice().toFixed(2) +
    '(元)，小计：' + subTotal.toFixed(2) + '(元)\n';
  });

  return cartItemsText;
};
CartItemsDao.prototype.getPromotionText = function() {
  var cartItems = this.cartItems;
  var promotionText = '';

  _.forEach(cartItems,function(cartItem) {

    var itemDao = new CartItemDao(cartItem);
    var subTotal = itemDao.getSubTotal();
    if (subTotal != cartItem.getPrice() * cartItem.getCount()) {
      promotionText += '名称：' + cartItem.getName() + '，数量：' +
      Math.floor(cartItem.getCount()/3) + cartItem.getUnit() + '\n';
    }
  });

  return promotionText;
};
