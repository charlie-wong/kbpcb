const render = require('../render');
const randomHex = require('random-hex-string').sync;

let startPosition = 2;
let uniqId = 123;

class GenericConnector {
  constructor(size, labelPrefix) {
    this.size = size;
    this.labelPrefix = labelPrefix;
    this.labels = [];
  }

  getNet() {
    let result = []
    for (let x = 0; x < this.size; ++x) {
      result.push(this.labelPrefix + x);
    }
    return result;
  }

  addLabel(label) {
    this.labelPrefix = null;
    this.labels.push(label);
  }

  getLabel(index) {
    if (this.labelPrefix) {
      return this.labelPrefix + index;
    }
    if (this.labels[index]) {
      return this.labels[index];
    }
    return "none";
  }

  renderSch() {
    const data = {
      "startPosition": startPosition++,
      "id": uniqId++,
      "size": this.size,
      "getLabel": (index) => this.getLabel(index),
      "randomTimestamp": `${randomHex(8)}`.toUpperCase()
    }
    return render(`templates/schematics/genericConnector.ejs`, { data });
  }

  render(netRepo) {
    return render(`templates/pcb/genericConnector.ejs`, { netRepo });
  }
}

module.exports = GenericConnector;
