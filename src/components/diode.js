const Component = require('./component');

class Diode extends Component {
  constructor(key) {
    super('diode', `D_${key.compositeName}`, 2);
    this.setPad(1, `/col${key.col}`);
  }

  getAdditionalData(x, y, options) {
    return {
      x: ((x + 0.5) * 1905) / 100,
      y: ((y + 0.5) * 1905) / 100,
    };
  }
}

module.exports = Diode;
