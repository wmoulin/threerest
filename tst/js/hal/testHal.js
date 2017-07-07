"use strict";

import express from "express";
import request from "supertest";
import assert from "assert";

import serviceHal from "./serviceHal";
import * as ServiceLoader from "../../../src/js/service-loader";

describe("Load service rest", function(){

  let app = express();
  ServiceLoader.loadService(app, new serviceHal());
    
  it("should add self link", function(done){

    request(app)
    .get("/hal/1")
    .expect(function(res) {
      assert.equal(res.body._links.self.href, "/hal/1");
      assert.equal(res.body.data._links.self.href, "/monApi/1");
    }).end(done);
  });

  it("should add all self link", function(done){

    request(app)
    .get("/hal")
    .expect(function(res) {
      assert.equal(res.body._links.self.href, "/hal");
      assert.equal(res.body.data[0]._links.self.href, "/monApi/1");
    }).end(done);
  });
});
