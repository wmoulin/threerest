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
    return [new User(1, "firstName1", "lastName1"), new User(2, "firstName2", "lastName2")];
  }
}

@Hal.halEntity("monApi/toto/:id")
class User {

  @Hal.resourceId()
  id = 0;

  constructor(id, firstName, lastName) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
