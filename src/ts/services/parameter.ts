import Service from "../service";
import "reflect-metadata";

declare var Reflect: any;

export const INJECT_PARAMETER_METADATA_KEY = "injectParametersRequest";


/**
* Decorator for 'POST' method.
* @method
* @param {string} path - path for Rest service.
* @param {number} httpStatus - http status for response.
*/
export function Params(param?: string) {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    applyOnFunction(target, propertyKey, parameterIndex, Service.paramKey, param);
  };
};

export function Body(param?: string) {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    applyOnFunction(target, propertyKey, parameterIndex, Service.bodyKey, param);
  };
};

export function Query(param?: string) {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    applyOnFunction(target, propertyKey, parameterIndex, Service.queryKey, param);
  };
};

export function Headers(param?: string) {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    applyOnFunction(target, propertyKey, parameterIndex, Service.headerKey, param);
  };
};

export function Request() {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    applyOnFunction(target, propertyKey, parameterIndex, Service.requestKey);
  };
};

export function Response() {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    applyOnFunction(target, propertyKey, parameterIndex, Service.responseKey);
  };
};


/**
* Add metadata to the function.
* @method
* @param {Object|function} target - instance to decorate.
* @param {string} key - attribute name.
* @param {Object} descriptor - property descriptor.
* @param {string} methodName - HTTP method name.
* @param {string} path - Url for REST service.
* @param {number} httpStatus - http status for response.
*/
function applyOnFunction(target: Object, propertyKey: string | symbol, parameterIndex: number, parameterTypeName: string, name?: string) {
  const injectParameters: { index: number, type: any, parameterType: string, name: string }[] = Reflect.getOwnMetadata(INJECT_PARAMETER_METADATA_KEY, target, propertyKey) || [];
  injectParameters.push({ index: parameterIndex, type: propertyKey, parameterType: parameterTypeName, name: name });
  Reflect.defineMetadata(INJECT_PARAMETER_METADATA_KEY, injectParameters, target, propertyKey);
};