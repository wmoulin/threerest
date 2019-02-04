import Service from "../../../../src/ts/service";
import { Methods } from "../../../../src/ts/services/methods";
import RestResult from "../../../../src/ts/services/rest-result";
import convert from "../../../../src/ts/convert";
import Param from "../../param";

@Service.path("/two")
export default class ServiceTestRestResult {

  @Methods.get("/:id")
  @convert(Param)
  testGet(value) {
    return new RestResult(222, value);
  }

}


