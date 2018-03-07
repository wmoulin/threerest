import Service from "../../../../src/ts/service";
import Method from "../../../../src/ts/services/methods";
import convert from "../../../../src/ts/convert";
import Param from "../../param";

@Service.path("/two")
export default class ServiceTest {

  @Method.get("/:id")
  @convert(Param)
  testGet(value) {
    return value;
  }
}
