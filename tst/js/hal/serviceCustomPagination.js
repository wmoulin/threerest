import Hal from "../../../src/ts/hypermedia/hal";
import Service from "../../../src/ts/service";
import Method from "../../../src/ts/services/methods";
import convert from "../../../src/ts/convert";
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
