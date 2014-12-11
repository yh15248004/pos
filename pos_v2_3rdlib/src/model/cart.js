function Cart() {
  this.cartItems = [];
}

Cart.prototype.findCartItem = function(barcode) {
  return _.find(this.cartItems, function(cartItem) {
    return cartItem.getBarcode() === barcode;
  });
};

Cart.prototype.addCartItem = function(cartItem) {
  var barcode = cartItem.getBarcode();
  var count = cartItem.count;

  var existCartItem = this.findCartItem(barcode);
  if(existCartItem) {
    existCartItem.count += count;
  } else {
    this.cartItems.push(cartItem);
  }

  return this.cartItems;
};

Cart.prototype.getCartItemsText = function() {

  var cartItemsText = '';

  _.forEach(this.cartItems,function(cartItem) {
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
