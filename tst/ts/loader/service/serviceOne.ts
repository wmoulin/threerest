import Service from "../../../../src/ts/service";
import { Methods } from "../../../../src/ts/services/methods";
import NotFoundError from "../../../../src/ts/exceptions/not-found-error";
import convert from "../../../../src/ts/convert";
import Param from "../../param";

@Service.path("/one")
export default class ServiceTest {

  @Methods.get("/:id")
  @convert(Param)
  testGet(value) {
    if(value.id == 13) {
      throw new NotFoundError("13: bad luck")
    }
    return value;
  }
}
