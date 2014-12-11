function CartItem(item, count) {
  this.item = item;
  this.count = count || 0;
}

CartItem.prototype.getBarcode = function() {
  return this.item.barcode;
};

CartItem.prototype.getSubTotal = function() {
  var promotions = Promotion.all();

  var promotion = _.find(promotions, {type : 'BUY_TWO_GET_ONE_FREE'});
  var subTotal = this.item.price * this.count;

  var isExist = _.contains(promotion.barcodes, this.item.barcode);
  if (isExist) {
    subTotal -= this.item.price * Math.floor(this.count / 3);
  }

  return subTotal;
};

CartItem.prototype.toCartItemText = function() {
  return '名称：' + this.item.name +
         '，数量：' + this.count + this.item.unit +
         '，单价：' + this.item.price.toFixed(2) +
         '(元)，小计：' + this.getSubTotal().toFixed(2) + '(元)\n';
};

CartItem.prototype.toPromotionText = function() {

  if (this.getSubTotal() != this.item.price * this.count) {
    return '名称：' + this.item.name + '，数量：' +
            Math.floor(this.count / 3) + this.item.unit + '\n';
  }

  return '';
};

CartItem.prototype.getNoSaveTotalAmount = function() {
  return this.item.price * this.count;
};
