function CartItemsDao(cartItems) {
  this.cartItems = cartItems;
}
CartItemsDao.prototype.getCartItemsText = function() {
  var cartItems = this.cartItems;
  var cartItemsText = '';

  _.forEach(cartItems,function(cartItem) {

    //var item = cartItem.getItem();
    var subTotal = cartItem.getSubTotal();
    cartItemsText += cartItem.toInventoryText();
  });

  return cartItemsText;
};

CartItemsDao.prototype.getPromotionText = function() {
  var cartItems = this.cartItems;
  var promotionText = '';

  _.forEach(cartItems,function(cartItem) {
    promotionText += cartItem.toPromotionText();
  });

  return promotionText;
};

CartItemsDao.prototype.getSummaryText = function() {
  var summaryText = '';
  var cartItemsTotalAmount = this.getCartItemsTotalAmount();
  var cartItemsSaveAmount = this.getCartItemsSaveAmount();
  summaryText += '总计：' + cartItemsTotalAmount.toFixed(2) + '(元)\n' +
  '节省：' + cartItemsSaveAmount.toFixed(2) + '(元)\n';
  return summaryText;
};

CartItemsDao.prototype.getCartItemsTotalAmount = function() {
  var cartItems = this.cartItems;
  var cartItemsTotalAmount = 0;

  _.forEach(cartItems,function(cartItem) {
    cartItemsTotalAmount += cartItem.getSubTotal();
  });

  return cartItemsTotalAmount;
};

CartItemsDao.prototype.getCartItemsSaveAmount = function() {
  var cartItems = this.cartItems;
  var noSaveTotalAmount = 0;
  var cartItemsTotalAmount = this.getCartItemsTotalAmount();

  _.forEach(cartItems,function(cartItem) {
    noSaveTotalAmount += cartItem.getNoSaveTotalAmount();
  });

  return noSaveTotalAmount - cartItemsTotalAmount;
};
