import RestError from "./rest-error";

/**
* Not Found Rest service error
* @class
*/
export default class NotFoundError extends RestError {

  constructor(message?: string) {
    super(message || "Not Found", 404);
    this.name = this.constructor.name;
  }
};
