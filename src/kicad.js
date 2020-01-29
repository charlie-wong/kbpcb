const NetRepo = require('./netRepo').instance;

const Keyboard = require('./keyboard');
const Component = require('./components/component');
const Switch = require('./components/switch');
const Diode = require('./components/diode');
const Frame = require('./components/frame');
const Plane = require('./components/plane');
const ProMicro = require('./components/promicro')
const ConnectorRp4c = require('./components/ConnectorRp4c')
const render = require('./render');

class KiCad {
  constructor(layout, options = {}) {
    this.layout = layout;
    this.pcb = [];
    this.schematic = [];
    this.gap = options.gap || 3;
    this.leds = options.leds;
    this.splitted = options.splitted;
    Component.options.initX = options.x || 0;
    Component.options.initY = options.y || 0;
  }

  generate() {
    NetRepo.clear();
    const keyboard = new Keyboard(this.layout);

    [...Array(keyboard.cols + 1)].forEach((_, i) => NetRepo.add(`col${i}`));
    [...Array(keyboard.rows + 1)].forEach((_, i) => NetRepo.add(`row${i}`));

    keyboard.forEach((k, i) => {
      k.name = k.name.replace(/[,.':";`~\/?]+/, "_");
      const key = { ...k };
      key.compositeName = `${k.name}_${i}`;
      const theSwitch = new Switch(key, this.leds);
      const diode = new Diode(key);
      theSwitch.connectPads(2, diode, 2);
      this.pcb.push(theSwitch.render(key.x, key.y, key.rotation));
      this.pcb.push(diode.render(key.x - 0.5, key.y, 90));
      this.schematic.push(theSwitch.renderSch(key))
    });
    const controller = new ProMicro();
    controller.connectMatrixWithPinout(keyboard);

    if (this.splitted) {
      const connector = new ConnectorRp4c();
      controller.addExternalConnector(connector.getPinOutConfiguration())
      connector.getNet().forEach((name) => NetRepo.add(name));
      this.pcb.push(connector.render(NetRepo))
      this.schematic.push(connector.renderSch());
    }
    
    controller.getNet().forEach((name) => NetRepo.add(name));
    this.schematic.push(controller.renderSch());
    this.pcb.push(controller.render(NetRepo));

    this.pcb.push(new Frame(keyboard).render(this.gap));
    this.pcb.push(new Plane(keyboard, 'GND', 'F.Cu').render(this.gap + 1));
    this.pcb.push(new Plane(keyboard, 'VCC', 'B.Cu').render(this.gap + 1));

    //fixme
    // const atmega32u4 = new Atmega32u4(this.modules,keyboard,this.gap);
    // atmega32u4.renderSch();  

    const modules = this.pcb.join('');
    const components = this.schematic.join('');
    const nets = NetRepo.array;
    return [
      render('templates/matrix.ejs', { components, nets }),
      render('templates/pcb.ejs', { modules, nets }),
    ];
  }
}

module.exports = (file, options) => new KiCad(file, options).generate();
