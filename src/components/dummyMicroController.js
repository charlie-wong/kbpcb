const GenericConnector = require('./genericConnector');

class DummyMicroController {
  constructor() {
    this.genericConnectors = [];
  }

  connectMatrixWithPinout(keyboard) {
    const colConnector = new GenericConnector(keyboard.cols, "col");
    const rowConnector = new GenericConnector(keyboard.rows, "row");
    this.genericConnectors.push(colConnector, rowConnector);
  }

  //fixed size 4
  addExternalConnector(portsConfiguration) {
    const connector = new GenericConnector(4);
    for(var propertyName in portsConfiguration) {
      connector.addLabel(portsConfiguration[propertyName]);
   }
   this.genericConnectors.push(connector);
  }

  getNet() {
    let result = [];
    this.genericConnectors.forEach((connector =>{
      result = result.concat(connector.getNet());
    }))
    return result;
  }

  renderSch() {
    let result = [];
    this.genericConnectors.forEach((connector =>{
      result.push(connector.renderSch());
    }))
    return result.join('');
  }

  render(netRepo) {
    let result = [];
    this.genericConnectors.forEach((connector =>{
      result.push(connector.render(netRepo));
    }))
    return result.join('');
  }
}

module.exports = DummyMicroController;
