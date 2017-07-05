"use strict";
import RestError from "./restError";

/**
* Not Found Rest service error
* @class
*/
export default class UnauthorizedError extends RestError {

  constructor(message) {
    super(message || "Unauthorized", 401);
    this.name = this.constructor.name;
  }
};
