export default class Param {

  id = undefined;
  name = "";

  constructor(arg={}) {
    this.name = arg.name || undefined;
    this.password = arg.password || undefined;
  }

};
