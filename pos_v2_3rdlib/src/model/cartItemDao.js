function CartItemDao(cartItem) {
  this.cartItem = cartItem;
}
CartItemDao.prototype.getSubTotal = function() {
  var cartItem = this.cartItem;
  var promotions = loadPromotions();
  var promotion = _.find(promotions,{type:'BUY_TWO_GET_ONE_FREE'});
  var subTotal = cartItem.getPrice() * cartItem.getCount();

  var isExist = _.contains(promotion.barcodes,cartItem.getBarcode());
  if (isExist) {
    subTotal -= cartItem.getPrice() * Math.floor(cartItem.getCount()/3);
  }

  return subTotal;
};
