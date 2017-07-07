import Hal from "../../../src/js/hypermedia/hal";
import Service from "../../../src/js/service";
import Methods from "../../../src/js/services/methods";
import DataHelper from "../helpers/dataHelper";

@Service.path("/pagination")
export default class ServicePagination {

  @Methods.get("/")
  @Hal.halServiceMethod(true)
  getAll() {
    return DataHelper.getTestData();
  }
}
