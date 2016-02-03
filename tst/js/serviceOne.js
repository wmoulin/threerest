import Service from "../../src/js/service";
import Method from "../../src/js/methods/method";

@Service.path("/test")
export default class ServiceTest {

  @Method.get("/");
  testGet(req, res, next) {
    console.log("coucou");
    res.send("coucou");
  }

}
