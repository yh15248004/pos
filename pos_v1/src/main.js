//TODO: Please write code in this file.
var item_linshi = [];
var allItems = new loadAllItems();
var promitions = new loadPromotions();
var printInventory = function(inputs) {
  for(var i = 0; i < inputs.length; i++) {
      if(inputs[i].split('-').length === 2) {
        item_teshu(inputs[i]);
      }
      else if(inputs[i].split('-').length === 1) {
        item_zhengchang(inputs[i]);
    }
  }
  console.log(item_push());

}
/*特殊条码处理法*/
var item_teshu = function(item) {
   for(var i = 0; i < item_linshi.length; i++) {
     if(item.split("-")[0] === item_linshi[i].barcode) {
       item_linshi[i].num +=item.split("-")[1];
       return 0;
     }
   }
  var obj = new Object();
  for(var i = 0; i < allItems.length; i++) {
    if(item.split("-")[0] === allItems[i].barcode) {
      obj.barcode = allItems[i].barcode;
      obj.name = allItems[i].name;
      obj.unit = allItems[i].unit;
      obj.price = allItems[i].price;
      obj.num = item.split("-")[1];
      item_linshi.push(obj);
      return 1;
    }
  }
}
/*正常条码处理法*/
var item_zhengchang = function(item) {
  for(var i = 0; i < item_linshi.length; i++) {
    if(item === item_linshi[i].barcode){
      item_linshi[i].num++;
      return;
    }
  }
  var obj = new Object();
  for(var i = 0; i < allItems.length; i++) {
    if(item === allItems[i].barcode){
       obj.barcode = allItems[i].barcode;
       obj.name = allItems[i].name;
       obj.unit = allItems[i].unit;
       obj.price = allItems[i].price;
       obj.num = 1;
      item_linshi.push(obj);
      return;
    }
  }
}
/*输出最终清单*/
var item_push = function() {
  var expectText = '***<没钱赚商店>购物清单***\n';
  /*小计*/
  for(var i = 0; i < item_linshi.length; i++) {
    item_linshi[i].prices = item_linshi[i].price * item_linshi[i].num;
    for(var j = 0; j < promitions[0].barcodes.length; j++) {
      if(item_linshi[i].barcode === promitions[0].barcodes[j]) {
        item_linshi[i].prices -= item_linshi[i].price*Math.floor(item_linshi[i].num/3);
      }
    }
  }

  for(var i = 0; i < item_linshi.length; i++) {
    expectText += '名称：'+item_linshi[i].name + '，数量：' + item_linshi[i].num + item_linshi[i].unit +
    '，单价：' + item_linshi[i].price.toFixed(2) +'(元)，小计：'
    + item_linshi[i].prices.toFixed(2) + '(元)\n';
  }
  expectText += '----------------------\n' + '挥泪赠送商品：\n';
  for(var i = 0; i < item_linshi.length; i++) {
    if(item_linshi[i].prices != item_linshi[i].price * item_linshi[i].num)
      expectText += '名称：' + item_linshi[i].name + '，数量：' + Math.floor(item_linshi[i].num/3) + item_linshi[i].unit + '\n';
    }
    expectText += '----------------------\n';
    var allPrices = 0;
    for(var i = 0; i < item_linshi.length; i++) {
      allPrices += item_linshi[i].prices;
    }
    expectText += '总计：' + allPrices.toFixed(2) + '(元)\n';
    var allPrice_lin = 0;
    for(var i = 0; i < item_linshi.length; i++) {
      allPrice_lin += item_linshi[i].price * item_linshi[i].num;
    }
    expectText += '节省：' + (allPrice_lin - allPrices).toFixed(2) + '(元)\n' + '**********************';
    return expectText;
}
