export class PaginationData {


  constructor(public pageIdxKeyWord: string, public pageSizeKeyWord: string, public startIdxKeyWord: string, public pageIdx: number = 0, public pageSize: number = 0, public startIdx: number = 0, public length: number = 0) {
    this.startIdx = startIdx;
    this.pageIdx = pageIdx;
    this.pageSize = pageSize;
    this.pageIdxKeyWord = pageIdxKeyWord;
    this.pageSizeKeyWord = pageSizeKeyWord;
    this.startIdxKeyWord = startIdxKeyWord;
    this.length = length;

    if (pageSize < 0) {
      throw new RangeError("pageSize must be greater or equal than zéro.");
    }
  }

  getPageMetadata(): MetaData {
    let metaData:MetaData = {};

    if (this.pageSize == 0) {
      this.pageSize = this.length;
    }

    metaData.nextIdx = this.pageIdx + 1;
    metaData.prevIdx = this.pageIdx - 1;

    if (metaData.prevIdx < 0) {
      delete metaData.prevIdx;
    }

    if (metaData.nextIdx > this.length) {
      delete metaData.nextIdx;
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

export interface MetaData {
  nextIdx?: number;
  prevIdx?: number;
  nextPage?: number;
  lastPage?: number;
  pageSize?: number;
  pageIdxKeyWord?: string;
  pageSizeKeyWord?: string;
  startIdxKeyWord?: string;
}

export interface IPaginationData {

  startIdx?: number;
  pageIdx?: number;
  pageSize?: number;
  pageIdxKeyWord?: string;
  pageSizeKeyWord?: string;
  startIdxKeyWord?: string;
  length?: number;

}