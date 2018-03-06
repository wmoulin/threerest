import RestError from "./rest-error";

/**
* Not Found Rest service error
* @class
*/
export default class UnauthorizedError extends RestError {

  constructor(message?: string) {
    super(message || "Unauthorized", 401);
    this.name = this.constructor.name;
  }
};
