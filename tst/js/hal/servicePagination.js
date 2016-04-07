import Hal from "../../../src/js/hypermedia/hal";
import Service from "../../../src/js/service";
import Methods from "../../../src/js/services/methods";
import convert from "../../../src/js/convert";
import Param from "../param";
import Pagination from "../../../src/js/services/pagination";
import NotFoundError from "../../../src/js/exceptions/NotFoundError";
import DataHelper from "../helpers/dataHelper";
// import Param from "../param";






@Service.path("/pagination")
export default class ServicePagination {

  // @Method.get("/:id")
  // @Hal.halServiceMethod()
  // @Pagination.paginate()
  // @convert(Param)
  // testGet(value) {
  //   return DataHelper.getTestData();
  // }

  @Methods.get("/")
  @Hal.halServiceMethod()
  @Pagination.paginate()
  getAll() {
    return getAuthors(db);
  }
}
