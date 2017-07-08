"use strict";

import Service from "../service";
import UnauthorizedError from "../exceptions/unauthorizedError";
import NotFoundError from "../exceptions/notFoundError";

/**
* Class for Secure decorator.
* @class
*/
export default class Secure {

  /**
  * Decorator for secure method service.
  * @method
  * @param {array<string>} roles - roles list.
  */
  static secure(roles) {
    let rolesList = []
    
    if (typeof roles === 'string' || roles instanceof String) {
      rolesList = [roles];UnauthorizedError
    } else if (Array.isArray(roles)) {
      rolesList = roles;
    }

    return function (target, key, descriptor) {
      descriptor.value.secure = function(request) {
          if (request) {
            if(isAllowed(request.user, rolesList)) {
              return ;
            }
          }
          if(process.env.NODE_ENV == "production") {
            throw new NotFoundError();
          }
          throw new UnauthorizedError();
          

      }
    };
  }

};

Secure.BEARER_HEADER = "Bearer ";
Secure.HEADER_AUTH = "Authorization";

/**
 * Verify access allowed
 * @param user User with roles
 * @param roles Role or roles liste allowed
 * @return {boolean}
 */
function isAllowed(user, roles) {
  var ok = false;
  // Si pas de roles à tester, on est autorisé
  if (!roles || roles.length === 0 || user && roles[0] == "*") ok = true;
  else {
    if (user && Array.isArray(user.roles)) {
      ok = roles.some((role) => {
        return user.roles.some((userRole) => {
          return role === userRole;
        });
      });
    }
  }

  return ok;
};
