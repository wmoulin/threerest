import Hal from "../../src/js/hypermedia/hal";
import Service from "../../src/js/service";
import Method from "../../src/js/methods/method";
import convert from "../../src/js/convert";
import Param from "./param";

@Service.path("/hal")
export default class ServiceTest {

  @Method.get("/:id")
  @Hal.halServiceMethod()
  @convert(Param)
  testGet(value) {
    return value;
  }
}

@Service.path("/whatever")
export class ServiceWhatever {

  @Method.get("/:id")
  @Hal.halServiceMethod()
  @convert(Param)
  testGet(value) {
    return value;
  }
}
