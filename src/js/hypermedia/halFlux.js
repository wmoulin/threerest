"use strict";

var SELF_LINK_PROP = "self";
var NEXT_LINK_PROP = "nextLink";
var PREVIOUS_LINK_PROP = "previousLink";

export default class halFlux {

  constructor(data) {

    this._links = {};
    this.data = data;
  }

  set selfLink(value) {
    this._links[SELF_LINK_PROP] = {href: value};
  }

  set nextLink(value) {
    this._links[NEXT_LINK_PROP] = {href: value};
  }

  set previousLink(value) {
    this._links[PREVIOUS_LINK_PROP] = {href: value};
  }

  static decorateSimpleObject(objet, selfLink) {
    objet._links = {};
    objet._links[SELF_LINK_PROP] = {href: selfLink};
  }
}
