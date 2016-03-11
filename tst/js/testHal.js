'use strict';

var express = require('express');
var request = require('supertest');

import serviceHal from"./serviceHal";
import {ServiceWhatever as newService} from"./serviceHal";
var serviceLoader = require("../../src/js/service-loader");
var assert = require("assert");

describe('Laod service rest', function(){
  it('should return a new route', function(done){

    var app = express();
    serviceLoader.loadService(app, new serviceHal());

    request(app)
    .get('/hal/12')
    .expect('{"id":"12","_links":{"self":{"href":"/hal/12"}}}', done);

  });

});

describe('Load service rest 2', function(){
  it('should return a new route', function(done){

    var app = express();
    serviceLoader.loadService(app, new newService());

    request(app)
    .get('/whatever/666')
    .expect('{"id":"666","_links":{"self":{"href":"/whatever/666"}}}', done);
  });

});