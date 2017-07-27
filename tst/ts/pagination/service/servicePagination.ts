import Service from "../../../../src/ts/service";
import Methods from "../../../../src/ts/services/methods";
import Pagination from "../../../../src/ts/services/pagination";
import DataHelper from "../../helpers/dataHelper";

@Service.path("/pagination")
export default class ServicePagination {

  @Methods.get("/")
  @Pagination.paginate()
  getAll() {
    return DataHelper.getTestData();
  }
}
