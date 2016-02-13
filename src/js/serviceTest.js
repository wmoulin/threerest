import Service from "./service";
import Method from "./methods/method";
import convert from "./convert";
import Param from "./param";
import NotFoundError from "./exceptions/notFoundError";


@Service.path("/test")
export class ServiceTest {

  @Method.get("/:id")
  @convert(Param)
  testGet(value) { //  testGet(req, res, next)
    return value;
  }

}

@Service.path("/erreur")
export class ServiceError {

  @Method.get("/")
  testGet() { //  testGet(req, res, next)
    throw new NotFoundError();
  }

}
