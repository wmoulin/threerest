import Service from "../../../../src/ts/service";
import { Methods } from "../../../../src/ts/services/methods";
import { Query, Body, Params, Headers, Request, Response } from "../../../../src/ts/services/parameter"
import Param from "../../param";

@Service.path("/one")
export default class ServiceTestParameter {

  /*@Methods.get("/:id")
  testGet(@Params("id") id: number, @Body() body:Param, @Request() request, @Response() response) {
    return {id, body, response: !!response.end, request: !!request.params["id"] };
  }*/

  @Methods.post("/:id")
  testPost(@Params("id") id: number, @Body() body:Param, @Request() request, @Response() response) {
    return {id, body, response: !!response.end, request: !!request.params["id"] };
  }

  @Methods.put("/:id")
  testPut(@Headers("Custom") myHeader, @Query("coucou") query) {
    return {myHeader, query};
  }

}


