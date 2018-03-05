import Service from "../service";
import UnauthorizedError from "../exceptions/unauthorizedError";
import NotFoundError from "../exceptions/notFoundError";
import ForbiddenError from "../exceptions/forbiddenError";
import { Router, Request, Response, Application, NextFunction } from "express";

/**
* Class for Secure decorator.
* @class
*/
export default class Secure {

  static BEARER_HEADER = "Bearer ";
  static HEADER_AUTH = "Authorization";

  /**
  * Decorator for secure method service.
  * @method
  * @param {array<string>} roles - roles list.
  */
  static secure(roles: string|Array<string>) {
    let rolesList: Array<string> = []
    
    if (typeof roles === 'string' || roles instanceof String) {
      rolesList = [roles as string];
    } else if (Array.isArray(roles)) {
      rolesList = roles;
    }

    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      descriptor.value.secure = function(request: Request) {
          if (request) {
            if(!(<any> request).user) {
              throw new ForbiddenError();
            }
            if(isAllowed((<any> request).user, rolesList)) {
              return ;
            }
          }
          throw new UnauthorizedError();
      }
    };
  }

};



/**
 * Verify access allowed
 * @param user User with roles
 * @param roles Role or roles liste allowed
 * @return {boolean}
 */
function isAllowed(user: {roles: Array<string>}, roles: Array<string>) {
  var ok = false;
  // Si pas de roles à tester, on est autorisé
  if (!roles || roles.length === 0 || user && roles[0] == "*") ok = true;
  else {
    if (user && Array.isArray(user.roles)) {
      ok = roles.some((role) => {
        return user.roles.some((userRole: string) => {
          return role === userRole;
        });
      });
    }
  }

  return ok;
};
