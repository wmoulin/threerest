import Service from "../../../../src/ts/service";
import { Methods } from "../../../../src/ts/services/methods";
import { Query, Body, Params, Headers } from "../../../../src/ts/services/parameter"
import convert from "../../../../src/ts/convert";
///import Param as Paramter from "../../param";

@Service.path("/one")
export default class ServiceTestParameter {

  @Methods.get("/:id")
  testGet(@Params("id") id, @Body() body) {
    return {id, body};
  }


  @Methods.put("/:id")
  testPut(@Headers("Custom") myHeader, @Query("coucou") query) {
    return {myHeader, query};
  }
}


