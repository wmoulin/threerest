import Service from "../../../../src/ts/service";
import Method from "../../../../src/ts/services/methods";
import convert from "../../../../src/ts/convert";
import Param from "../../param";

@Service.path("/one")
export default class ServiceTest {

  @Method.get("/:id")
  @convert(Param)
  testGet(value) {
    value.method = "get"
    return value;
  }

  @Method.post("")
  @convert(Param)
  testPost(value) {
    value.method = "post"
    return value;
  }

  @Method.delete("/:id")
  @convert(Param)
  testDelete(value) {
    value.method = "delete"
    return value;
  }

  @Method.put("/:id")
  @convert(Param)
  testPut(value) {
    value.method = "put"
    return value;
  }

  @Method.patch("/:id")
  @convert(Param)
  testPatch(value) {
    value.method = "patch"
    return value;
  }

}


