function CartItemDao(cartItem) {
  this.cartItem = cartItem;
}
CartItemDao.prototype.getSubTotal = function() {
  var cartItem = this.cartItem;
  var item = cartItem.getItem();
  var promotions = loadPromotions();
  
  var promotion = _.find(promotions,{type:'BUY_TWO_GET_ONE_FREE'});
  var subTotal = item.getPrice() * cartItem.getCount();

  var isExist = _.contains(promotion.getBarcodes(),item.getBarcode());
  if (isExist) {
    subTotal -= item.getPrice() * Math.floor(cartItem.getCount()/3);
  }

  return subTotal;
};
