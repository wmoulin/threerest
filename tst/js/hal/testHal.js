'use strict';

var express = require('express');
var request = require('supertest');

import serviceHal from"./serviceHal";
var serviceLoader = require("../../../src/js/service-loader");
var assert = require("assert");

describe('Laod service rest', function(){
  it('should return a new route', function(done){

    var app = express();
    serviceLoader.loadService(app, new serviceHal());

    request(app)
    .get('/hal/12')
    .expect(function(res) {
      console.log(res.body);
      assert.equal(res.body._links.self, '/hal/12');
    }).end(done);
  });

});
