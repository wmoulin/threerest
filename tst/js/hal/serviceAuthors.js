import Hal from "../../../src/js/hypermedia/hal";
import Service from "../../../src/js/service";
import Methods from "../../../src/js/services/methods";
import NotFoundError from "../../../src/js/exceptions/notFoundError";
import BdHelper from "../helpers/bdHelper";


var db = require("./database");

@Service.path("/authors")
export default class ServiceAuthors {

  @Methods.get("/")
  @Hal.halServiceMethod()
  getAll() {
    return BdHelper.getAuthors(db);
  }

  @Methods.get("/:id")
  @Hal.halServiceMethod()
  getswitchId(params) {
    let id = params.id;
  	let result = BdHelper.searchParams(db, "authors", "id", id);
  	if (result) {
      return BdHelper.getAuthor(result, id);
  	}
    throw new NotFoundError();
  }
}
