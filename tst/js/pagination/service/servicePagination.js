import Service from "../../../../src/js/service";
import Methods from "../../../../src/js/services/methods";
import Pagination from "../../../../src/js/services/pagination";
import DataHelper from "../../helpers/dataHelper";

@Service.path("/pagination")
export default class ServicePagination {

  @Methods.get("/")
  @Pagination.paginate()
  getAll() {
    return DataHelper.getTestData();
  }
}
