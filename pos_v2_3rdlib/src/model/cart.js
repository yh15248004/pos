function Cart() {
  this.cartItems = [];
}
Cart.prototype.getCartItemsText = function() {

  var cartItemsText = '';

  _.forEach(this.cartItems,function(cartItem) {
    var subTotal = cartItem.getSubTotal();
    cartItemsText += cartItem.toCartItemsText();
  });

  return cartItemsText;
};

Cart.prototype.getPromotionText = function() {
  var promotionText = '';

  _.forEach(this.cartItems,function(cartItem) {
    promotionText += cartItem.toPromotionText();
  });

  return promotionText;
};

Cart.prototype.getSummaryText = function() {
  var summaryText = '';
  var cartItemsTotalAmount = this.getCartItemsTotalAmount();
  var cartItemsSaveAmount = this.getCartItemsSaveAmount();
  summaryText += '总计：' + cartItemsTotalAmount.toFixed(2) + '(元)\n' +
                 '节省：' + cartItemsSaveAmount.toFixed(2) + '(元)\n';
  return summaryText;
};

Cart.prototype.getCartItemsTotalAmount = function() {
  var cartItemsTotalAmount = 0;

  _.forEach(this.cartItems,function(cartItem) {
    cartItemsTotalAmount += cartItem.getSubTotal();
  });

  return cartItemsTotalAmount;
};

Cart.prototype.getCartItemsSaveAmount = function() {
  var noSaveTotalAmount = 0;
  var cartItemsTotalAmount = this.getCartItemsTotalAmount();

  _.forEach(this.cartItems,function(cartItem) {
    noSaveTotalAmount += cartItem.getNoSaveTotalAmount();
  });

  return noSaveTotalAmount - cartItemsTotalAmount;
};
