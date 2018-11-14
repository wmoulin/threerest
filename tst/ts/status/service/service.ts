import Service from "../../../../src/ts/service";
import { Methods } from "../../../../src/ts/services/methods";
import convert from "../../../../src/ts/convert";
import Param from "../../param";

@Service.path("/one")
export default class ServiceTest {

  @Methods.get("/:id")
  @convert(Param)
  testGet(value) {
    value.method = "get"
    return value;
  }

  @Methods.get("/status/:id", 222)
  @convert(Param)
  testGetStatus(value) {
    value.method = "get"
    return value;
  }

  @Methods.post("")
  @convert(Param)
  testPost(value) {
    value.method = "post"
    return value;
  }

  @Methods.del("/:id")
  @convert(Param)
  testDelete(value) {
    value.method = "delete"
    return value;
  }

  @Methods.put("/:id")
  @convert(Param)
  testPut(value) {
    value.method = "put"
    return value;
  }

  @Methods.patch("/:id")
  @convert(Param)
  testPatch(value) {
    value.method = "patch"
    return value;
  }

}


