function CartItem(item, count) {
  this.item = item;
  this.count = count;
}

CartItem.prototype.setItem = function(item) {
  this.item = item;
};
CartItem.prototype.getItem = function() {
  return this.item;
};

CartItem.prototype.setCount = function(count) {
  this.count = count;
};
CartItem.prototype.getCount = function() {
  return this.count;
};
