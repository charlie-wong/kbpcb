const NetRepo  = require('./netRepo').instance;

const Keyboard = require('./keyboard');
const Component = require('./components/component');
const Switch = require('./components/switch');
const Cap = require('./components/cap');
const Diode = require('./components/diode');
const Resistor = require('./components/resistor');
const Frame = require('./components/frame');
const Plane = require('./components/plane');
const Usb = require('./components/usb');
const Reset = require('./components/reset');
const Crystal = require('./components/crystal');
const Micro = require('./components/micro');
const ProMicro = require('./components/promicro')
const Atmega32u4 = require('./components/atmega32u4')

const render = require('./render');

class KiCad {
  constructor(layout, options={}) {
    this.layout = layout;
    this.modules = [];
    this.components = [];
    this.gap = options.gap || 3;
    this.leds = options.leds;
    Component.options.initX = options.x || 0;
    Component.options.initY = options.y || 0;
  }

  generate() {
    NetRepo.clear();
    const keyboard = new Keyboard(this.layout);

    [...Array(keyboard.cols+1)].forEach((_, i) => NetRepo.add(`/col${i}`));
    [...Array(keyboard.rows+1)].forEach((_, i) => NetRepo.add(`/row${i}`));

    keyboard.forEach((k,i) => {
      const key = {...k};
      key.compositeName = `${k.name}_${i}`;
      const theSwitch = new Switch(key, this.leds);
      const diode     = new Diode(key);
      theSwitch.connectPads(2, diode, 2);
      this.modules.push(theSwitch.render(key.x, key.y, key.rotation));
      this.modules.push(diode.render(key.x - 0.5, key.y, 90));
      this.components.push(theSwitch.renderSch(key))
    });
    const controller = new ProMicro();
    this.components.push(controller.renderSch(keyboard));

    this.modules.push(new Frame(keyboard).render(this.gap));
    this.modules.push(new Plane(keyboard, 'GND', 'F.Cu').render(this.gap + 1));
    this.modules.push(new Plane(keyboard, 'VCC', 'B.Cu').render(this.gap + 1));

    //fixme
   // const atmega32u4 = new Atmega32u4(this.modules,keyboard,this.gap);
   // atmega32u4.renderSch();  

    const modules = this.modules.join('');
    const components = this.components.join('');
    const nets = NetRepo.array;
    return [
      render('templates/matrix.ejs', { components, nets }),
      render('templates/pcb.ejs', { modules, nets }),
    ];
  }
}

module.exports = (file, options) => new KiCad(file, options).generate();
