export default class Param {

  id = undefined;
  name = "";
  password = undefined;

  constructor(arg:{name?: string, password?: string}={}) {
    this.name = arg.name || undefined;
    this.password = arg.password || undefined;
  }

};
