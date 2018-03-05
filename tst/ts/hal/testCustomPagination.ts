import * as express from "express";
import * as request from "supertest";
import * as assert from "assert";

import "mocha";

import serviceCustomPagination from "./serviceCustomPagination";
import DataHelper from "../helpers/dataHelper";
import * as ServiceLoader from "../../../src/ts/service-loader";

describe("Check Pagination with custom keyword for limit and offset", function(){

  let app = express();
  ServiceLoader.loadService(app, new serviceCustomPagination());

  it("should return all the result", function(done){

    var data = DataHelper.getTestData();
    request(app)
    .get("/paginationCustom/666")
    .expect(function(res) {
      let expected = { _links:
        { self: {
          href:"/paginationCustom/666"}
        }, data: data}
        
      assert(res.body._links);
      assert.equal(res.body._links.self.href, expected._links.self.href);
      assert.equal(res.body.data.length, expected.data.length);

      DataHelper.testData(res.body.data, expected.data, 0, 13);

    }).end(done);
  });


  it("should return the four first result", function(done){

    request(app)
    .get("/paginationCustom/666?limite=4")
    .expect(function(res) {
      let expected = { _links:
        { self: {
          href:"/paginationCustom/666?limite=4"}
        }, data: [{firstName:"Peter", lastName:"Parker", secretIdentity: "Spiderman", offset:"0"},
        {firstName:"Bruce", lastName:"Wayne", secretIdentity: "Batman", offset:"1"},
        {firstName:"Clark", lastName:"Kent", secretIdentity: "Superman", offset:"2"},
        {firstName:"Tony", lastName:"Stark", secretIdentity: "Iron Man", offset:"3"}]}

      assert.equal(res.body._links.self.href, expected._links.self.href);
      assert.equal(res.body.data.length, expected.data.length);

      DataHelper.testData(res.body.data, expected.data, 0, 4);

    }).end(done);
  });

  it("should return all the result from offset 8", function(done){

    request(app)
    .get("/paginationCustom/666?offsetIndex=8")
    .expect(function(res) {
      let expected = { _links:
        { self: {
          href:"/paginationCustom/666?offsetIndex=8"}
        }, data: [{firstName:"Matt", lastName:"Murdock", secretIdentity: "Daredevil", offset:"8"},
        {firstName:"Wade", lastName:"Wilson", secretIdentity: "Deadpool", offset:"9"},
        {firstName:"Elektra", lastName:"Natchios", secretIdentity: "Elektra", offset:"10"},
        {firstName:"Dave", lastName:"Lizewski", secretIdentity: "Kick-Ass", offset:"11"},
        {firstName:"Franck", lastName:"Castle", secretIdentity: "Punisher", offset:"12"}]}

      assert.equal(res.body._links.self.href, expected._links.self.href);
      assert.equal(res.body.data.length, expected.data.length);

      DataHelper.testData(res.body.data, expected.data, 8, 5);

    }).end(done);
  });

  it("should return the first three result", function(done){

    request(app)
    .get("/paginationCustom/666?limite=3&index=0")
    .expect(function(res) {
      let expected = { _links:
        { self: {
          href:"/paginationCustom/666?limite=3&index=0"}
        }, data: [{firstName:"Peter", lastName:"Parker", secretIdentity: "Spiderman", offset:"0"},
        {firstName:"Bruce", lastName:"Wayne", secretIdentity: "Batman", offset:"1"},
        {firstName:"Clark", lastName:"Kent", secretIdentity: "Superman", offset:"2"}]}
      assert.equal(res.body._links.self.href, expected._links.self.href);
      assert.equal(res.body.data.length, expected.data.length);

      DataHelper.testData(res.body.data, expected.data, 0, 3);

    }).end(done);
  });

  it("should return the two result start with offset 5", function(done){

    request(app)
    .get("/paginationCustom/666?limite=2&index=5")
    .expect(function(res) {
      console.log(res.body);
      let expected = { _links:
        { self: {
          href:"/paginationCustom/666?limite=2&index=5"}
        }, data: [{firstName:"Bruce", lastName:"Banner", secretIdentity: "Hulk", offset:"5"},
                {firstName:"Natasha", lastName:"Romanoff", secretIdentity: "Black Widow", offset:"6"}]}

      assert.equal(res.body._links.self.href, expected._links.self.href);
      assert.equal(res.body.data.length, expected.data.length);

      DataHelper.testData(res.body.data, expected.data, 5, 2);
    }).end(done);
  });
});
