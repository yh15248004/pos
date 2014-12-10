function Promotion(type, barcodes) {
    this.type = type;
    this.barcodes = barcodes || [];
}
Promotion.prototype.getType = function() {
  return this.type;
};
Promotion.prototype.setType = function(type) {
  this.type = type;
};

Promotion.prototype.getBarcodes = function() {
  return this.barcodes;
};
Promotion.prototype.setBarcodes = function(barcodes) {
  this.barcodes = barcodes;
};
