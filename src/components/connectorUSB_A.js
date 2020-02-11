const render = require('../render');

class ConnectorUSB_A {
   getPinOutConfiguration() {
    return {
      "vcc":"VCC",
      "rx":"RX",
      "tx":"TX",
      "gnd":"GND"
    }
  }

  getNet(){
    return ['VCC','GND','RX','TX','UNUSED-1-USB-A','UNUSED-2-USB-A'];
  }
  renderSch() {
    return render(`templates/schematics/usb-a.ejs`, {  });
  }
  
  render(netRepo) {
    return render(`templates/pcb/usb-a.ejs`, { netRepo });
  }
}

module.exports = ConnectorUSB_A;
