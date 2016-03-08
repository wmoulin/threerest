export default class Hal {

  static halServiceMethod(paginator) {
    return function decorate(target, key, descriptor) {
      let oldFunct = descriptor.value;

      descriptor.value = function() {
        let p = new Promise((resolve) => { resolve(true); });
        p = p.then(()=> {
          var result = oldFunct.apply(this.caller, arguments);
          result.self = arguments[1].originalUrl;
          return result;
        });
        return p;
      };

      if (oldFunct.convertBefore) {
        descriptor.value.convertBefore = oldFunct.convertBefore;
      }
    }
  }

  static halEntity() {
    return function decorate(target) {
      if (!target.halLink) {
        Object.defineProperty(target, 'halLink', {
          value : function(){ return "link" }
        });
      }
    }
  }

  static resourceId() {
    return function decorate(target, key, descriptor) {
      if (!target.halRessourceId) {
        Object.defineProperty(target, 'halRessourceId', {
          get : function(){ return target[key]; }
        });
      }
    }
  }

}
