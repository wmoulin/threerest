import Hal from "../../../src/js/hypermedia/hal";
import Service from "../../../src/js/service";
import Methods from "../../../src/js/services/methods";
import convert from "../../../src/js/convert";
import Param from "../param";
import Pagination from "../../../src/js/services/pagination";
import NotFoundError from "../../../src/js/exceptions/NotFoundError";
import BdHelper from "../helpers/bdHelper";


var db = require('./database');

@Service.path("/authors")
export default class ServiceAuthors {

  @Methods.get("/")
  @Hal.halServiceMethod()
  getAll() {
    return BdHelper.getAuthors(db);
  }

  @Methods.get("/:id")
  @Hal.halServiceMethod()
  getswitchId(value) {
    var id = value.params.id;
  	var result = BdHelper.searchParams(db, 'authors', 'id', id);
  	if (result) {
      return BdHelper.getAuthor(result, id);
  	}
    throw new NotFoundError();
  }
}
