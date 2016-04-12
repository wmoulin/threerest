"use strict";

import HalFlux from "./halFlux"

var NEXT_LINK_PROP = "nextLink";
var PREVIOUS_LINK_PROP = "previousLink";
var FIRST_LINK_PROP = "first";
var LAST_LINK_PROP = "last";

/**
 * Class for decorate data with HAL metadata.
 * @class
 */
export default class HalPaginateFlux extends HalFlux {

  constructor(data, paginationData) {
    super();
    this._links = {};
    this.data = data;
    this.paginationData = paginationData;
  }

  set nextLink(value) {
    this._links[NEXT_LINK_PROP] = {href: value};
  }

  set previousLink(value) {
    this._links[PREVIOUS_LINK_PROP] = {href: value};
  }

  set firstLink(value) {
    this._links[FIRST_LINK_PROP] = {href: value};
  }

  set lastLink(value) {
     this._links[LAST_LINK_PROP] = {href: value};
  }

  updateLinks(currentUrl, baseUrl, paginateObject) {
    super.updateLinks(currentUrl);
    let paginationMetadata = paginationData.getPageMetadata();
    this.nextLink = result.nextLink = baseUrl + "?" + paginateObject.pageSize + "=" + paginationData.pageSize + "&" + paginateObject.pageIdx + "=" + paginationMetadata.nextIdx;
    this.previousLink = baseUrl + "?" + paginateObject.pageSize + "=" + paginationData.pageSize + "&" + paginateObject.pageIdx + "=" + paginationMetadata.prevIdx;
    this.firstLink = baseUrl + "?" + paginateObject.pageSize + "=" + paginationData.pageSize + "&" + paginateObject.pageIdx + "=0";
    this.lastLink = baseUrl + "?" + paginateObject.pageSize + "=" + paginationData.pageSize + "&" + paginateObject.pageIdx + "=" + paginationMetadata.lastPage;
  }
}
