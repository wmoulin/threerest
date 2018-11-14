import * as express from "express";
import * as request from "supertest";
import * as assert from "assert";

import "mocha";

import * as bodyParser from "body-parser";
import * as multer from "multer";

import ServiceTestParameter from "./service/service";
import * as ServiceLoader from "../../../src/ts/service-loader";


describe("Laod simple service rest with parameter decorators", function() {

  let app = express();
  app.use(bodyParser.urlencoded({extended : false}));
  app.use(multer().array());  
  ServiceLoader.loadService(app, new ServiceTestParameter());

  it("should return a get", function(done) {

    request(app)
    .get("/one/1")
    .expect('{"id":"1","body":{}}', done);
  });

  it("should return a post body", function(done) {

    request(app)
    .get("/one/1")
    .field("field", 11)
    .expect('{"id":"1","body":{"field":"11"}}', done);
  });

  it("should return a put", function(done) {

    request(app)
    .put("/one/3")
    .set("Custom", "myCustomHeader")
    .query({ coucou: 'hi' }) 
    .expect('{"myHeader":"myCustomHeader","query":"hi"}', done);
  });

});
