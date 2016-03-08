export default class Hal {

  halServiceMethod(paginator) {
    return function decorate(target, key, descriptor) {
      let oldFunct = descriptor.value;
      descriptor.value = function() {
        return oldFunct.apply(this.caller, arguments);
      };
    }
  }

  halEntity() {
    return function decorate(target) {
      if (!target.halLink) {
        Object.defineProperty(target, 'halLink', {
          value : function(){ return "link" }
        });
      }
    }
  }

  resourceId() {
    return function decorate(target, key, descriptor) {
      if (!target.halRessourceId) {
        Object.defineProperty(target, 'halRessourceId', {
          get : function(){ return target[key]; }
        });
      }
    }
  }

}
