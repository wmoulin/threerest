"use strict";

export default class PaginationDate {

  constructor(currentIdx, pageSize=10, length) {
    this.currentIdx = parseInt(currentIdx);
    this.pageSize = parseInt(pageSize);
    this.length = parseInt(length);

    if (pageSize <= 0) {
      throw new RangeError("pageSize must be greater than zéro.");
    }
  }

  set currentIdx(value) {
    this.currentIdx = value;
  }

  set pageSize(value) {
    this.pageSize = value;
  }

  set length(value) {
    this.length = value;
  }

  getPageMetadata() {
    let metaData = {};
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
