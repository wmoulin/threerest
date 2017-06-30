import Service from "../../../../src/js/service";
import Method from "../../../../src/js/services/methods";
import convert from "../../../../src/js/convert";
import Param from "../../param";

@Service.path("/one")
export default class ServiceTest {

  @Method.get("/:id")
  @convert(Param)
  testGet(value) {
    return value;
  }
}
