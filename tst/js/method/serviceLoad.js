"use strict";

import express from "express";
import request from "supertest";
import assert from "assert";
import bodyParser from "body-parser";
import multer from "multer";

import serviceTest from "./service/service";
import * as ServiceLoader from "../../../src/ts/service-loader";


describe("Laod simple service rest", function() {

  let app = express();
  app.use(bodyParser.urlencoded({extended : false}));
  app.use(multer().array());  
  ServiceLoader.loadService(app, new serviceTest());

  it("should return a get", function(done) {

    request(app)
    .get("/one/1")
    .expect('{"id":"1","method":"get"}', done);
  });

  it("should return a post", function(done) {

    request(app)
    .post("/one")
    .field("id", 11)
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
});
