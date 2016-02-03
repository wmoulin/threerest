import Service from "./service";
import Method from "./methods/method";

@Service.path("/test")
export default class ServiceTest {

  @Method.get("/");
  testGet(req, res, next) {
    res.send("coucou");
  }

}
