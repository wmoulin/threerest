import Service from "../../../../src/ts/service";
import Method from "../../../../src/ts/services/methods";
import Secure from "../../../../src/ts/services/secure";
import convert from "../../../../src/ts/convert";
import Param from "../../param";

@Service.path("/one")
export default class ServiceTest {

  @Method.get("/user/:id")
  @convert(Param)
  @Secure.secure(["USER"])
  testGetUser(value) {
    return value;
  }

  @Method.get("/adminuser/:id")
  @convert(Param)
  @Secure.secure(["USER", "ADMIN"])
  testGetAdmin(value) {
    return value;
  }
}
