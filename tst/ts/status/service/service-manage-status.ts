import Service from "../../../../src/ts/service";
import Method from "../../../../src/ts/services/methods";
import convert from "../../../../src/ts/convert";
import Param from "../../param";

@Service.path("/three")
export default class ServiceManageStatus {

  @Method.get("/:id")
  @convert(Param)
  testGet(value) {
    value.method = "get"
    return value;
  }

  manageStatus(request:Request, valueToReturn: any):number {
    if(!valueToReturn && request.method.toUpperCase() == "GET") return 404;
    return 222;
  }

}


