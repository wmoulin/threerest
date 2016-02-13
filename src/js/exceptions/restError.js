"use strict";

export default class RestError extends Error {
  constructor(message, code) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.stack = (new Error()).stack;
    //Error.captureStackTrace(this, this.constructor.name);
  }

};

/*function RestError(message) {
  this.name = 'RestError';
  this.message = message || 'Default Message';
  this.code = 404;
  this.stack = (new Error()).stack;
}
RestError.prototype = Object.create(Error.prototype);
RestError.prototype.constructor = RestError;
export default RestError;*/
