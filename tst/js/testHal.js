'use strict';

var express = require('express');
var request = require('supertest');

import serviceHal from"./serviceHal";
var serviceLoader = require("../../src/js/service-loader");
var assert = require("assert");

describe('Laod service rest', function(){
  it('should return a new route', function(done){

    var app = express();
    serviceLoader.loadService(app, new serviceHal());

    request(app)
    .get('/hal/12')
    .expect('{"id":"12","self":"/hal/12"}', done);
  });

});
