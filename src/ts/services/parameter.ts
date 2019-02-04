import Service from "../service";
import "reflect-metadata";

declare var Reflect: any;

export const INJECT_PARAMETER_METADATA_KEY = "injectParametersRequest";


/**
* Decorator for extract 'params' ex : id in  "http://domain/context/ressource/:id" .
* @method
* @param {string} attrPath - attribut path.
*/
export function Params(attrPath?: string) {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    applyOnFunction(target, propertyKey, parameterIndex, Service.paramKey, attrPath);
  };
};

/**
* Decorator for extract 'body' from request .
* @method
* @param {string} attrPath - attribut path.
*/
export function Body(attrPath?: string) {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    applyOnFunction(target, propertyKey, parameterIndex, Service.bodyKey, attrPath);
  };
};

/**
* Decorator for extract 'query' from request ex : id in  "http://domain/context/ressource?id=<id>".
* @method
* @param {string} attrPath - attribut path.
*/
export function Query(attrPath?: string) {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    applyOnFunction(target, propertyKey, parameterIndex, Service.queryKey, attrPath);
  };
};

/**
* Decorator for extract 'header' from request .
* @method
* @param {string} attrPath - attribut path.
*/
export function Headers(attrPath?: string) {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    applyOnFunction(target, propertyKey, parameterIndex, Service.headerKey, attrPath);
  };
};

/**
* Decorator for get request instance.
* @method
* @param {string} attrPath - attribut path.
*/
export function Request() {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    applyOnFunction(target, propertyKey, parameterIndex, Service.requestKey);
  };
};

/**
* Decorator for get response instance.
* @method
* @param {string} attrPath - attribut path.
*/
export function Response() {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    applyOnFunction(target, propertyKey, parameterIndex, Service.responseKey);
  };
};


/**
* Add metadata to the function.
* @method
* @param {Object|function} target - instance to decorate.
* @param {string} propertyKey - attribute name.
* @param {number} parameterIndex - index parameter.
* @param {string} parameterTypeName - parameter type (key for retrieve type).
* @param {string} name - attribut path.
*/
function applyOnFunction(target: Object, propertyKey: string | symbol, parameterIndex: number, parameterTypeName: string, name?: string) {
  const injectParameters: { index: number, type: any, parameterType: string, name: string }[] = Reflect.getOwnMetadata(INJECT_PARAMETER_METADATA_KEY, target, propertyKey) || [];
  injectParameters.push({ index: parameterIndex, type: propertyKey, parameterType: parameterTypeName, name: name });
  Reflect.defineMetadata(INJECT_PARAMETER_METADATA_KEY, injectParameters, target, propertyKey);
};