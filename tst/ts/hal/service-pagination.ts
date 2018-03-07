import Hal from "../../../src/ts/hypermedia/hal";
import Service from "../../../src/ts/service";
import Methods from "../../../src/ts/services/methods";
import DataHelper from "../helpers/data-helper";

@Service.path("/pagination")
export default class ServicePagination {

  @Methods.get("/")
  @Hal.halServiceMethod(true)
  getAll() {
    return DataHelper.getTestData();
  }
}
