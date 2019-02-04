import Hal from "../../../src/ts/hypermedia/hal";
import Service from "../../../src/ts/service";
import { Methods } from "../../../src/ts/services/methods";
import convert from "../../../src/ts/convert";
import Param from "../param";
import NotFoundError from "../../../src/ts/exceptions/not-found-error";

@Service.path("/hal")
export default class ServiceTest {

  @Methods.get("/:id")
  @Hal.halServiceMethod()
  @convert(Param)
  testGet(value) {
    if (value && value.id == 1) {
      return new User(1, "firstName1", "lastName1");
    }
    throw new NotFoundError();
  }

  @Methods.get("/")
  @Hal.halServiceMethod()
  testGetAll() {
    return [new User(1, "firstName1", "lastName1"), new User(2, "firstName2", "lastName2")];
  }
}

@Hal.halEntity("/monApi/:halId", "halId")
class User {

  @Hal.resourceId()
  id = 0;

  contact: Contact;

  constructor(id, public firstName, public lastName) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.contact = new Contact("email@toto.fr");
  }
}

@Hal.halEntity("/monApi/:id/contact")
class Contact {

  @Hal.resourceId()
  id = 0;

  constructor(public email: string) {
    this.email = email;
  }
}
