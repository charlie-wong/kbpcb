const render = require('../render');

class ProMicro  {
  constructor() {
    this.availablePins = ['b6','b2','b3','b1','f7','f6','f5','f4','b5','b4','e6','d7','c6','d4','d0','d1','d2','d3']
    this.unusedPins=['vcc','rst','gnd','gnd2','gnd3','raw']
    this.nets = [];
    this.availablePins.forEach(item=>{
      this.nets[item]=`Net-(Controller1-${item})`;
    })  
    this.unusedPins.forEach(item=>{
      this.nets[item]=`Net-(Controller1-${item})`;
    })  
    this.usedPins={}  
  }
  connectFreePinWithLabel(label){
     if(this.availablePins.length>0){
      const pinToUse = this.availablePins.shift();
      this.usedPins[pinToUse]=label;  
      this.nets[pinToUse]=label;
      return pinToUse;
     } 
     throw 'No pin available'
  }

  connectMatrixWithPinout(keyboard){
    if(this.usedPins['b6']!=null){
      return;
    }
    [...Array(keyboard.cols)].forEach((_, c) => {
      this.connectFreePinWithLabel(`col${c}`);
    });

    [...Array(keyboard.rows)].forEach((_, r) => {
      this.connectFreePinWithLabel(`row${r}`);
    });
  }

  getNet(){
    const result = [];
    for(var propertyName in this.nets) {
       result.push(this.nets[propertyName]); 
    }
    return result;
  }

  renderSch() {
    const pins = this.usedPins;  
    return render(`templates/schematics/promicro.ejs`, { pins });
  }

  render(netRepo) {
    const pins = this.nets;  
    return render(`templates/pcb/promicro.ejs`, { pins,netRepo });
  }
}

module.exports = ProMicro;
