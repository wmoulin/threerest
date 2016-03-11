"use strict";
import RestError from "./restError";

/**
* Not Found Rest service error
* @class
*/
export default class NotFoundError extends RestError {

  constructor(message) {
    super(message || "Not Found", 404);
    this.name = this.constructor.name;
  }
};
