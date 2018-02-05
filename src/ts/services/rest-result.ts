import ArrayHelper from "../helpers/arrayHelper";
import { PaginationData } from "./paginationData";
import { Request } from "express";

 export default class RestResult<T> {

  public code:number;
  public data:T;

  constructor(code:number, data?:T) {
    this.code = code;
    this.data = data;
  }
 }


