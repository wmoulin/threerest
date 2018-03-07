var SELF_LINK_PROP = "self";

/**
 * Class for decorate data with HAL metadata.
 * @class
 */
export default class HalFlux {

  protected _links: any;

  constructor(public data: any) {

    this._links = {};
    this.data = data;
  }

  set selfLink(value: string) {
    this._links[SELF_LINK_PROP] = {href: value};
  }

  updateLinks(currentUrl: string, ...rest:Array<any>) {
    this._links[SELF_LINK_PROP] = {href: currentUrl};
  }

  static decorateSimpleObject(object: any, requestParameters: any) {
        
    if (object) {
      if (object.halLink) {
        object._links = {};
        object._links[SELF_LINK_PROP] = {href: object.halLink.call(object, requestParameters)};
      }
      
      for (let attrib in object) {
        if (object[attrib] && Array.isArray(object[attrib])) {
          object[attrib].forEach((elt: any, index: number) => {
            if (elt && elt.halLink) {
              HalFlux.decorateSimpleObject(elt, requestParameters);
            }
          });
        } else if (object[attrib] && object[attrib].halLink) {
          HalFlux.decorateSimpleObject(object[attrib], requestParameters);
        }
      }
    }
  }
}
