import Hal from "../../../src/js/hypermedia/hal";
import Service from "../../../src/js/service";
import Method from "../../../src/js/services/methods";
import convert from "../../../src/js/convert";
import Pagination from "../../../src/js/services/pagination";
import Param from "../param";

@Service.path("/pagination")
export default class ServicePagination {

  @Method.get("/:id")
  @Hal.halServiceMethod()
  @convert(Param)
  testGet(value) {
    return [
      {firstName:"John", lastName:"Doe"},
      {firstName:"Anna", lastName:"Smith"},
      {firstName:"Peter",lastName: "Jones"}
    ];
  }
}


@Service.path("/paginationCustom")
export class ServicePaginationCustom {

  constructor() {
    this.coucou = "voila";
  }

  @Method.get("/:id")
  @Hal.halServiceMethod()
  @Pagination.paginate("limite", "offset2")
  @convert(Param)
  testGet(value) {
    return [
      {firstName:"John", lastName:"Doe"},
      {firstName:"Anna", lastName:"Smith"},
      {firstName:"Peter",lastName: "Jones"}
    ];
  }
}
