"use strict";

/**
* Rest service error
* @class
*/
export default class RestError extends Error {
  constructor(message, code) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.stack = (new Error()).stack;
  }

};
