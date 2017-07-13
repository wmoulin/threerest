"use strict";

export default class PaginationData {

  constructor(pageIdxKeyWord, pageSizeKeyWord, startIdxKeyWord, pageIdx=0, pageSize=0, startIdx=0, length=0) {
    this.startIdx = parseInt(startIdx);
    this.pageIdx = parseInt(pageIdx);
    this.pageSize = parseInt(pageSize);
    this.pageIdxKeyWord = pageIdxKeyWord;
    this.pageSizeKeyWord = pageSizeKeyWord;
    this.startIdxKeyWord = startIdxKeyWord;
    this.length = parseInt(length);

    if (pageSize < 0) {
      throw new RangeError("pageSize must be greater or equal than zéro.");
    }
  }

  getPageMetadata() {
    let metaData = {};

    if (this.pageSize == 0) {
      this.pageSize = this.length;
    }

    metaData.nextIdx = this.pageIdx + 1;
    metaData.prevIdx = this.pageIdx - 1;

    if (metaData.prevIdx < 0) {
      metaData.prevIdx = undefined;
    }

    if (metaData.nextIdx > this.length) {
      metaData.nextIdx = undefined;
    }

    metaData.lastPage = Math.trunc(this.length / this.pageSize);
    if(this.length % this.pageSize == 0) {
      metaData.lastPage++;
    }
    metaData.pageSize = this.pageSize;
    metaData.pageIdxKeyWord = this.pageIdxKeyWord;
    metaData.pageSizeKeyWord = this.pageSizeKeyWord;
    metaData.startIdxKeyWord = this.startIdxKeyWord;
    return metaData;
  }

}
