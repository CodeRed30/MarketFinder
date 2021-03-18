export default class MarketData {
  constructor(){
    this._name = '';
    this._description = ''
  }

  addName(name) {
    this._name = name;
  }

  addDescription(description) {
    this._description = description;
  }

  showName = () => this._name ;
  showDescription = () => this._description;
}
