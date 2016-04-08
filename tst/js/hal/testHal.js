'use strict';

var express = require('express');
var request = require('supertest');

import serviceHal from"./serviceHal";
var serviceLoader = require("../../../src/js/service-loader");
var assert = require("assert");

describe('Load service rest', function(){
  it('should add self link', function(done){

    var app = express();
    serviceLoader.loadService(app, new serviceHal());
    request(app)
    .get('/hal/1')
    .expect(function(res) {
      assert.equal(res.body._links.self.href, '/hal/1');
      assert.equal(res.body.data._links.self.href, '/monApi/1');
    }).end(done);
  });

  it('should add all self link', function(done){

    var app = express();
    serviceLoader.loadService(app, new serviceHal());

    request(app)
    .get('/hal')
    .expect(function(res) {
      assert.equal(res.body._links.self.href, '/hal');
      assert.equal(res.body.data[0]._links.self.href, '/monApi/1');
    }).end(done);
  });
});
