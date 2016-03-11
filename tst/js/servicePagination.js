import Hal from "../../src/js/hypermedia/hal";
import Service from "../../src/js/service";
import Method from "../../src/js/methods/method";
import convert from "../../src/js/convert";
import Param from "./param";

@Service.path("/pagination")
export default class ServicePagination {

  @Method.get("/:id")
  @Hal.halServiceMethod()
  @convert(Param)
  testGet(value) {
    return [
      {"firstName":"John", "lastName":"Doe"},
      {"firstName":"Anna", "lastName":"Smith"},
      {"firstName":"Peter","lastName": "Jones"}
    ];
  }
}


@Service.path("/paginationCustom")
export class ServicePaginationCustom {

  @Method.get("/:id")
  @Hal.halServiceMethod("limite", "offset2")
  @convert(Param)
  testGet(value) {
    return [
      {"firstName":"John", "lastName":"Doe"},
      {"firstName":"Anna", "lastName":"Smith"},
      {"firstName":"Peter","lastName": "Jones"}
    ];
  }
}
