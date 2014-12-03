function printInventory(tags) {
  var cartItems = getCartItems(tags);
  var inventroyText = getInventroyText(cartItems);
  console.log(inventroyText);
}

function getCartItems(tags) {
  cartItems = [];
  var items = loadAllItems();

  for(var i = 0; i < tags.length; i++) {
    var tagArray  = tags[i].split('-');
    var barcode = tagArray[0];
    var count = 1;
    if(tagArray[1]) {
      count = parseFloat(tagArray[1]);
    }
    var item = findItem(items,barcode);
    var cartItem = findCartItem(cartItems,barcode);
    if(cartItem) {
      cartItem.count += count;
    }else{
      cartItems.push({item:item , count:count});
    }
  }
  return cartItems;
}

function getInventroyText(cartItems) {
  var cartItemsText = '';
  var catItemsText = getCartItemsText(cartItems);
  var promotionText = getPromotionText(cartItems);
  var summaryText = getsummaryText(cartItems);

  cartItemsText += '***<没钱赚商店>购物清单***\n' +
                    catItemsText +
                    '----------------------\n' +
                    '挥泪赠送商品：\n' +
                    promotionText +
                    '----------------------\n' +
                    summaryText +
                    '**********************';
  return cartItemsText;
}

function findItem(items,barcode) {
  var item;
  for(var i = 0; i < items.length; i++) {
    if(items[i].barcode === barcode){
      item = items[i];
    }
    //break;
  }
  return item;
}

function findCartItem(cartItems,barcode) {
  var cartItem;
  for(var i = 0; i < cartItems.length; i++) {
    if(cartItems[i].item.barcode === barcode){
      cartItem = cartItems[i];
    }
    //break;
  }
  return cartItem;
}

function getCartItemsText(cartItems) {
  var catItemsText = '';
  for(var i = 0; i < cartItems.length; i++) {
    var catItemsPrice = getCatItemsPrice(cartItems[i]);
    catItemsText += '名称：' + cartItems[i].item.name +
                    '，数量：' + cartItems[i].count + cartItems[i].item.unit +
                    '，单价：' + cartItems[i].item.price.toFixed(2) +
                    '(元)，小计：' + catItemsPrice.toFixed(2) + '(元)\n';

  }
  return catItemsText;
}

function getPromotionText(cartItems) {
  var promotionText = '';
  for(var i = 0 ; i < cartItems.length; i++) {
    var catItemsPrice = getCatItemsPrice(cartItems[i]);
    if(catItemsPrice != cartItems[i].item.price * cartItems[i].count) {
      promotionText += '名称：' + cartItems[i].item.name + '，数量：' +
      Math.floor(cartItems[i].count/3) + cartItems[i].item.unit + '\n';
    }
  }
  return promotionText;
}

function getsummaryText(cartItems) {
  var summaryText = '';
  var cartItemsTotalPrice = getCartItemsTotalPrice(cartItems);
  var cartItemsSavePrice = getCartItemsSavePrice(cartItems);
  summaryText += '总计：' + cartItemsTotalPrice.toFixed(2) + '(元)\n' +
                 '节省：' + cartItemsSavePrice.toFixed(2) + '(元)\n';
  return summaryText;
}

function getCatItemsPrice(cartItem) {
  var promotions = loadPromotions();
  catItemsPrice = cartItem.item.price * cartItem.count;
  for(var i = 0; i < promotions[0].barcodes.length; i++) {
    if(cartItem.item.barcode === promotions[0].barcodes[i]) {
      catItemsPrice -= cartItem.item.price * Math.floor(cartItem.count/3);
    }
  }
  return catItemsPrice;
}

function getCartItemsTotalPrice(cartItems) {
  var cartItemsTotalPrice = 0;
  for(var i = 0 ; i < cartItems.length; i++) {
    var catItemsPrice = getCatItemsPrice(cartItems[i]);
    cartItemsTotalPrice += catItemsPrice;
  }
  return cartItemsTotalPrice;
}

function getCartItemsSavePrice(cartItems) {
  var cartItemsSavePrice = 0;
  var cartItemsNoSaveTotalPrice = 0;
  var cartItemsTotalPrice = getCartItemsTotalPrice(cartItems);
  for(var i = 0 ; i < cartItems.length; i++) {
    cartItemsNoSaveTotalPrice += cartItems[i].item.price * cartItems[i].count;
  }
  cartItemsSavePrice = cartItemsNoSaveTotalPrice - cartItemsTotalPrice;
  return cartItemsSavePrice;
}
