'use strict';
var express = require('express');
var request = require('supertest');

import serviceOne from"./service/service";
var serviceLoader = require("../../../src/js/service-loader");
var assert = require("assert");

describe('Laod secure service rest', function(){
  it('should authorized for role user', function(done){

    var app = express();
    serviceLoader.loadService(app, new serviceOne());

    request(app)
    .get('/one/user/12')
    .expect('{"id":"12"}', done);
  });

  it('should not authorized for role user', function(done){

    var app = express();
    serviceLoader.loadService(app, new serviceOne());

    request(app)
    .get('/one/user/12')
    .set('Authorization', 'Bearer application/json')
    .expect('{"id":"12"}', done);
  });

  it('should not authorized for all roles', function(done){

    var app = express();
    serviceLoader.loadService(app, new serviceOne());

    request(app)
    .get('/one/user/12')
    .set('Authorization', 'Bearer application/json')
    .expect('{"id":"12"}', done);
  });
});
