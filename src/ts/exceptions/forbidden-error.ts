import RestError from "./rest-error";

/**
* Not Found Rest service error
* @class
*/
export default class ForbiddenError extends RestError {

  constructor(message?: string) {
    super(message || "Forbidden", 403);
    this.name = this.constructor.name;
  }
};
