function InputsDao(tags) {
  this.tags = tags;
}
InputsDao.prototype.getCartItems = function() {
  var tags = this.tags;
  var cartItems = [];
  var items = loadAllItems();

  _.forEach(tags, function(tag) {

    var tagArray  = tag.split('-');
    var barcode = tagArray[0];
    var count = 1;

    if(tagArray[1]) {
      count = parseFloat(tagArray[1]);
    }

    var item = _.find(items, {barcode: barcode});
    var cartItem = _.find(cartItems, function(cartItem) {
      return cartItem.getBarcode() === barcode;
    });

    if(cartItem) {
      cartItem.setCount(cartItem.getCount() + count);//cartItem.count += count;
    } else {
      var cartItem = new CartItem(item, count);
      cartItems.push(cartItem);
    }

  });

  return cartItems;
};
