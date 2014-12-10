function CartItem(item, count) {
  this.item = item;
  this.count = count || 0;
}

CartItem.getLoadPromotions = function() {
  return loadPromotions();
};

CartItem.prototype.getBarcode = function() {
  return this.item.barcode;
};

CartItem.prototype.getSubTotal = function() {
  var promotions = CartItem.getLoadPromotions();

  var promotion = _.find(promotions,{type:'BUY_TWO_GET_ONE_FREE'});
  var subTotal = this.item.price * this.count;

  var isExist = _.contains(promotion.barcodes,this.item.barcode);
  if (isExist) {
    subTotal -= this.item.price * Math.floor(this.count/3);
  }

  return subTotal;
};

CartItem.prototype.toCartItemsText = function() {
  return '名称：' + this.item.name +
         '，数量：' + this.count + this.item.unit +
         '，单价：' + this.item.price.toFixed(2) +
         '(元)，小计：' + this.getSubTotal().toFixed(2) + '(元)\n';
};

CartItem.prototype.toPromotionText = function() {

  if (this.getSubTotal() != this.item.price * this.count) {
    return '名称：' + this.item.name + '，数量：' +
            Math.floor(this.count/3) + this.item.unit + '\n';
  }

  return '';
};

CartItem.prototype.getNoSaveTotalAmount = function() {
  return this.item.price * this.count;
};


// CartItem.all = function() {
//   return loadAllItems();
// };
//
// CartItem.getCartItems = function(tags) {
//   var cartItems = [];
//   var items = this.all();
//
//   _.forEach(tags, function(tag) {
// 
//     var tagArray  = tag.split('-');
//     var barcode = tagArray[0];
//     var count = 1;
//
//     if(tagArray[1]) {
//       count = parseFloat(tagArray[1]);
//     }
//
//     var item = _.find(items, {barcode: barcode});
//     var cartItem = _.find(cartItems, function(cartItem) {
//       return cartItem.item.barcode === barcode;
//     });
//
//     if(cartItem) {
//       cartItem.count += count;
//     } else {
//       cartItems.push(new CartItem(item, count));
//     }
//
//   });
//
//   return cartItems;
// };
