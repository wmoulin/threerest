import Service from "./service";
import Method from "./methods/method";
import convert from "./convert";
import Param from "./param";

@Service.path("/test")
export default class ServiceTest {

  @Method.get("/:id")
  @convert(Param)
  testGet(value) { //  testGet(req, res, next)
    return value;
  }

}
