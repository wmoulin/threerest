import Service from "../../../../src/ts/service";
import { Methods } from "../../../../src/ts/services/methods";
import Secure from "../../../../src/ts/services/secure";
import convert from "../../../../src/ts/convert";
import Param from "../../param";

@Service.path("/one")
export default class ServiceTest {

  @Methods.get("/user/:id")
  @convert(Param)
  @Secure.secure(["USER"])
  testGetUser(value) {
    return value;
  }

  @Methods.get("/adminuser/:id")
  @convert(Param)
  @Secure.secure(["USER", "ADMIN"])
  testGetAdmin(value) {
    return value;
  }
}
