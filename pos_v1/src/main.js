function printInventory(tags) {
  var cartItems = getCartItems(tags);
  var inventroyText = getInventroyText(cartItems);
  console.log(inventroyText);
}

function getCartItems(tags) {
  var cartItems = [];
  var items = loadAllItems();

  _.forEach(tags, function(tag){

    var tagArray  = tag.split('-');
    var barcode = tagArray[0];
    var count = 1;

    if(tagArray[1]) {
      count = parseFloat(tagArray[1]);
    }

    var item = _.find(items, {barcode: barcode});
    //var cartItem = findCartItem(cartItems,barcode);
    var cartItem = _.find(cartItems, function(cartItem){
      return cartItem.item.barcode === barcode;
    });

    if(cartItem) {
      cartItem.count += count;
    }else{
      cartItems.push({item:item , count:count});
    }

  });

  return cartItems;
}

function getInventroyText(cartItems) {
  var inventoryText = '';
  var cartItemsText = getCartItemsText(cartItems);
  var promotionText = getPromotionText(cartItems);
  var summaryText = getSummaryText(cartItems);

  inventoryText += '***<没钱赚商店>购物清单***\n' +
                    cartItemsText +
                    '----------------------\n' +
                    '挥泪赠送商品：\n' +
                    promotionText +
                    '----------------------\n' +
                    summaryText +
                    '**********************';
  return inventoryText;
}

// function findCartItem(cartItems,barcode) {
//   var cartItem;
//
//   for(var i = 0; i < cartItems.length; i++) {
//     if(cartItems[i].item.barcode === barcode){
//       cartItem = cartItems[i];
//       break;
//     }
//   }
//
//   return cartItem;
// }

function getCartItemsText(cartItems) {
  var cartItemsText = '';

  _.forEach(cartItems,function(cartItem){
    var subTotal = getSubTotal(cartItem);
        cartItemsText += '名称：' + cartItem.item.name +
                         '，数量：' + cartItem.count + cartItem.item.unit +
                         '，单价：' + cartItem.item.price.toFixed(2) +
                         '(元)，小计：' + subTotal.toFixed(2) + '(元)\n';
  });

  return cartItemsText;
}

function getPromotionText(cartItems) {
  var promotionText = '';

  _.forEach(cartItems,function(cartItem) {
  //for(var i = 0 ; i < cartItems.length; i++) {
    var subTotal = getSubTotal(cartItem);
    if (subTotal != cartItem.item.price * cartItem.count) {
      promotionText += '名称：' + cartItem.item.name + '，数量：' +
      Math.floor(cartItem.count/3) + cartItem.item.unit + '\n';
    }
  });

  return promotionText;
}

function getSummaryText(cartItems) {
  var summaryText = '';
  var cartItemsTotalAmount = getCartItemsTotalAmount(cartItems);
  var cartItemsSaveAmount = getCartItemsSaveAmount(cartItems);
      summaryText += '总计：' + cartItemsTotalAmount.toFixed(2) + '(元)\n' +
                     '节省：' + cartItemsSaveAmount.toFixed(2) + '(元)\n';
  return summaryText;
}

function getSubTotal(cartItem) {
  var promotions = loadPromotions();
  //var promotion = findPromotion(promotions,'BUY_TWO_GET_ONE_FREE');
  var promotion = _.find(promotions,{type:'BUY_TWO_GET_ONE_FREE'});
  var subTotal = cartItem.item.price * cartItem.count;

  var isExist = _.contains(promotion.barcodes,cartItem.item.barcode);
  // for(var i = 0; i < promotion.barcodes.length; i++) {
  //   if (cartItem.item.barcode === promotion.barcodes[i]) {
  //     subTotal -= cartItem.item.price * Math.floor(cartItem.count/3);
  //   }
  // }
  if (isExist) {
    subTotal -= cartItem.item.price * Math.floor(cartItem.count/3);
  }

  return subTotal;
}

// function findPromotion(promotions,type) {
//   var promotion;
//
//   for(var i = 0; i < promotions.length; i++) {
//     if (promotions[i].type === type) {
//       promotion = promotions[i];
//     }
//   }
//
//   return promotion;
// }

function getCartItemsTotalAmount(cartItems) {
  var cartItemsTotalAmount = 0;
  _.forEach(cartItems,function(cartItem){
    cartItemsTotalAmount += getSubTotal(cartItem);
  });

  return cartItemsTotalAmount;
}

function getCartItemsSaveAmount(cartItems) {
  var noSaveTotalAmount = 0;
  var cartItemsTotalAmount = getCartItemsTotalAmount(cartItems);

  _.forEach(cartItems,function(cartItem){
    noSaveTotalAmount += cartItem.item.price * cartItem.count;
  });

  return noSaveTotalAmount - cartItemsTotalAmount;
}
