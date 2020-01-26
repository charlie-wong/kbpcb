const render = require('../render');

class ProMicro  {
  constructor() {
    this.availablePins = ['b6','b2','b3','b1','f7','f6','f5','f4','b5','b4','e6','d7','c6','d4','d0','d1','rx','tx','vcc','rst']
    this.usedPins={}  
  }
  connectFreePinWithLabel(label){
     if(this.availablePins.length>0){
      const pinToUse = this.availablePins.shift();
      this.usedPins[pinToUse]=label;  
      return pinToUse;
     } 
     throw 'No pin available'
  }

  renderSch(keyboard) {
    [...Array(keyboard.cols)].forEach((_, c) => {
      this.connectFreePinWithLabel(`col${c}`);
    });

    [...Array(keyboard.rows)].forEach((_, r) => {
      this.connectFreePinWithLabel(`row${r}`);
    });

    const pins = this.usedPins;  
    return render(`templates/schematics/promicro.ejs`, { pins });
  }
}

module.exports = ProMicro;
