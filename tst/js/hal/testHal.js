'use strict';

var express = require('express');
var request = require('supertest');

import serviceHal from"./serviceHal";
var serviceLoader = require("../../../src/js/service-loader");
var assert = require("assert");

describe.skip('Load service rest', function(){
  it('should add self link', function(done){

    var app = express();
    serviceLoader.loadService(app, new serviceHal());

    request(app)
    .get('/hal/12')
    .expect(function(res) {
      assert.equal(res.body._links.self.href, '/hal/12');
      assert.equal(res.body.data[0]._links.self.href, '/monApi/12/1');
    }).end(done);
  });

});
