const fmtName = require('./name');

class Key {
  constructor(name, x, y, w, h, rotation, row, col) {
    this.name = fmtName(name);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.size = w;
    this.rotation = rotation;
    this.row = row;
    this.col = col;
  }
}
Key.metric1uSize = 1905
Key.convertMetricToKeyboardUnit = size => {
  if (size){
    return parseFloat(size * 100 / Key.metric1uSize).toPrecision(4);
  }
  return size;
}
module.exports = Key;
