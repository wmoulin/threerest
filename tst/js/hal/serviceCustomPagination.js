import Hal from "../../../src/js/hypermedia/hal";
import Service from "../../../src/js/service";
import Method from "../../../src/js/services/methods";
import convert from "../../../src/js/convert";
import Pagination from "../../../src/js/services/pagination";
import DataHelper from "../helpers/dataHelper";
import Param from "../param";

@Service.path("/paginationCustom")
export default class ServicePaginationCustom {

  constructor() {
    this.coucou = "voila";
  }

  @Method.get("/:id")
  @Hal.halServiceMethod()
  @Pagination.paginate("limite", "index")
  @convert(Param)
  testGet(value) {
    return DataHelper.getTestData();
  }
}
