import Hal from "../../../src/ts/hypermedia/hal";
import Service from "../../../src/ts/service";
import Methods from "../../../src/ts/services/methods";
import NotFoundError from "../../../src/ts/exceptions/not-found-error";
import BdHelper from "../helpers/bd-helper";


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
