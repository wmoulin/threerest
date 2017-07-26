import HalFlux from "./halFlux";
import { PaginationData } from "../services/paginationData";

var NEXT_LINK_PROP = "nextLink";
var PREVIOUS_LINK_PROP = "previousLink";
var FIRST_LINK_PROP = "first";
var LAST_LINK_PROP = "last";

/**
 * Class for decorate data with HAL metadata.
 * @class
 */
export default class HalPaginateFlux extends HalFlux {

  constructor(data: Array<any>, public paginationData: PaginationData) {
    super(data);
    this.paginationData = paginationData;
  }

  set nextLink(value: string) {
    this._links[NEXT_LINK_PROP] = {href: value};
  }

  set previousLink(value: string) {
    this._links[PREVIOUS_LINK_PROP] = {href: value};
  }

  set firstLink(value: string) {
    this._links[FIRST_LINK_PROP] = {href: value};
  }

  set lastLink(value: string) {
     this._links[LAST_LINK_PROP] = {href: value};
  }

  updateLinks(currentUrl: string, baseUrl: string) {
    super.updateLinks(currentUrl);
    let paginationMetadata = this.paginationData.getPageMetadata();
    this.nextLink = baseUrl + "?" + paginationMetadata.pageSizeKeyWord + "=" + paginationMetadata.pageSize + "&" + paginationMetadata.pageIdxKeyWord + "=" + paginationMetadata.nextIdx;
    this.previousLink = baseUrl + "?" + paginationMetadata.pageSizeKeyWord + "=" + paginationMetadata.pageSize + "&" + paginationMetadata.pageIdxKeyWord + "=" + paginationMetadata.prevIdx;
    this.firstLink = baseUrl + "?" + paginationMetadata.pageSizeKeyWord + "=" + paginationMetadata.pageSize + "&" + paginationMetadata.pageIdxKeyWord + "=0";
    this.lastLink = baseUrl + "?" + paginationMetadata.pageSizeKeyWord + "=" + paginationMetadata.pageSize + "&" + paginationMetadata.pageIdxKeyWord + "=" + paginationMetadata.lastPage;
  }
}
