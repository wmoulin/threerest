import Service from "../../../../src/js/service";
import Method from "../../../../src/js/services/methods";
import Secure from "../../../../src/js/services/secure";
import convert from "../../../../src/js/convert";
import Param from "../../param";

@Service.path("/one")
export default class ServiceTest {

  @Method.get("/user/:id")
  @convert(Param)
  @Secure.secure(["user"])
  testGetUser(value) {
    return value;
  }

  @Method.get("/admin/:id")
  @convert(Param)
  @Secure.secure(["admin"])
  testGetAdmin(value) {
    return value;
  }
}
