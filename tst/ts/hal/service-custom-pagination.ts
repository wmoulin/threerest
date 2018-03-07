import Hal from "../../../src/ts/hypermedia/hal";
import Service from "../../../src/ts/service";
import Method from "../../../src/ts/services/methods";
import convert from "../../../src/ts/convert";
import DataHelper from "../helpers/data-helper";
import Param from "../param";

@Service.path("/paginationCustom")
export default class ServicePaginationCustom {

  @Method.get("/:id")
  @Hal.halServiceMethod({pageSizeKeyWord:"limite", pageIdxKeyWord:"index", startIdxKeyWord:"offsetIndex"})
  @convert(Param)
  testGet(value) {
    return DataHelper.getTestData();
  }
}
