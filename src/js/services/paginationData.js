"use strict";

export default class PaginationDate {

  constructor(currentIdx=0, pageSize, length) {
    this.currentIdx = parseInt(currentIdx);
    this.pageSize = parseInt(pageSize || length);
    this.length = parseInt(length);

    if (pageSize <= 0) {
      throw new Error("pageSize must be greater than zéro.");
    }
  }

  getPageMetadata() {
    let metaData = {};
    metaData.currentIdx = this.currentIdx;
    metaData.pageSize = this.pageSize;
    metaData.length = this.length;
    metaData.nextIdx = this.currentIdx + this.pageSize;
    metaData.prevIdx = this.currentIdx + this.pageSize;

    if (this.prevIdx < 0) {
      metaData.prevIdx = undefined;
    }

    if (this.nextPage > this.length) {
      metaData.nextIdx = undefined;
    }
    metaData.lastPage = this.length / this.pageSize;
    if(this.length % this.pageSize == 0) {
      metaData.lastPage++;
    }
    return metaData;
  }

}
