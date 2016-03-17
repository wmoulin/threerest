'use strict';

var express = require('express');
var request = require('supertest');

import servicePagination from"./servicePagination";
import {ServicePaginationCustom as servicePaginationCustom} from"./servicePagination";
var serviceLoader = require("../../../src/js/service-loader");
var assert = require("assert");


describe('Check Pagination with limite and offset2', function(){
  it('should return array part', function(done){

    var app = express();
    serviceLoader.loadService(app, new servicePaginationCustom());

    request(app)
    .get('/paginationCustom/666?limite=1&offset2=0')
    .expect(function(res) {
      let expected = { _links:
        { self: {
          href:"/paginationCustom/666?limite=1&offset2=0"}
        }, data: [{firstName:"John",lastName:"Doe"}]}
      assert.equal(res.body._links.self.href, expected._links.self.href);
      assert.equal(res.body.data.length, expected.data.length);
      assert.equal(res.body.data[0].firstname, expected.data[0].firstname);
    }).end(done);
  });

});
