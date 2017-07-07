import Hal from "../../../src/js/hypermedia/hal";
import Service from "../../../src/js/service";
import Method from "../../../src/js/services/methods";
import convert from "../../../src/js/convert";
import DataHelper from "../helpers/dataHelper";
import Param from "../param";

@Service.path("/paginationCustom")
export default class ServicePaginationCustom {

  @Method.get("/:id")
  @Hal.halServiceMethod({pageSize:"limite", pageIdx:"index", startIdx:"offsetIndex"})
  @convert(Param)
  testGet(value) {
    return DataHelper.getTestData();
  }
}
