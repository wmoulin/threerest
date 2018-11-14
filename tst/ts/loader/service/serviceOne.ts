import Service from "../../../../src/ts/service";
import { Methods } from "../../../../src/ts/services/methods";
import convert from "../../../../src/ts/convert";
import Param from "../../param";

@Service.path("/one")
export default class ServiceTest {

  @Methods.get("/:id")
  @convert(Param)
  testGet(value) {
    return value;
  }
}
