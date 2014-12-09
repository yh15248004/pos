function CartItem(item, count) {
  this.item = item;
  this.count = count;
}
CartItem.prototype.setItem = function(item) {
  this.item = item;
};
CartItem.prototype.getItem = function(item) {
  return this.item;
};
CartItem.prototype.getBarcode = function() {
  return this.item.barcode;
};
CartItem.prototype.getName = function() {
  return this.item.name;
};
CartItem.prototype.getUnit = function() {
  return this.item.unit;
};
CartItem.prototype.getPrice = function() {
  return this.item.price;
};
CartItem.prototype.setCount = function(count) {
  this.count = count;
};
CartItem.prototype.getCount = function() {
  return this.count;
};
