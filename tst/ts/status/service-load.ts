import * as express from "express";
import * as request from "supertest";
import * as assert from "assert";

import "mocha";

import * as bodyParser from "body-parser";
import * as multer from "multer";

import ServiceTest from "./service/service";
import ServiceTestRestResult from "./service/service-rest-result";
import ServiceManageStatus from "./service/service-manage-status";
import * as ServiceLoader from "../../../src/ts/service-loader";


describe("Load simple service rest", function() {

  let app = express();
  app.use(bodyParser.urlencoded({extended : false}));
  app.use(multer().array());  
  ServiceLoader.loadService(app, new ServiceTest());
  ServiceLoader.loadService(app, new ServiceTestRestResult());
  ServiceLoader.loadService(app, new ServiceManageStatus());

  it("should return a get", function(done) {

    request(app)
    .get("/one/1")
    .expect(200)
    .expect('{"id":"1","method":"get"}', done);
  });

  it("should return a post", function(done) {

    request(app)
    .post("/one")
    .field("id", 11)
    .expect(201)
    .expect('{"id":"11","method":"post"}', done);
  });

  it("should return a delete", function(done) {

    request(app)
    .delete("/one/2")
    .expect('{"id":"2","method":"delete"}', done);
  });

  it("should return a put", function(done) {

    request(app)
    .put("/one/3")
    .expect('{"id":"3","method":"put"}', done);
  });

  it("should return a patch", function(done) {

    request(app)
    .patch("/one/4")
    .expect('{"id":"4","method":"patch"}', done);
  });

  it("should return a get with status 222 from method decorator", function(done) {

    request(app)
    .get("/one/status/1")
    .expect(222)
    .expect('{"id":"1","method":"get"}', done);
  });

  it("should return a get with status 222 from RestResult", function(done) {

    request(app)
    .get("/two/1")
    .expect(222)
    .expect('{"id":"1"}', done);
  });


  it("should return a get with status 222 from RestResult", function(done) {

    request(app)
    .get("/three/1")
    .expect(222)
    .expect('{"id":"1","method":"get"}', done);
  });
});
