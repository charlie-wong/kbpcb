const render = require('../render');

class ConnectorRp4c {
   getPinOutConfiguration() {
     return {
       "vcc":"VCC",
       "rx":"RX",
       "tx":"TX",
       "gnd":"GND"
     }
  }

  getNet(){
    return ['VCC','GND','RX','TX'];
  }
  renderSch() {
    return render(`templates/schematics/4p4c.ejs`, {  });
  }
  
  render(netRepo) {
    return render(`templates/pcb/4p4c.ejs`, { netRepo });
  }
}

module.exports = ConnectorRp4c;
