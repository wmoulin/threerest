'use strict';
var express = require('express');
var request = require('supertest');

import serviceTest from"./service/service";
var serviceLoader = require("../../../src/js/service-loader");
var assert = require("assert");

describe('Laod simple service rest', function(){
  it('should return a get', function(done){

    var app = express();
    serviceLoader.loadService(app, new serviceTest());

    request(app)
    .get('/one/12')
    .expect('{"id":"12","method":"get"}', done);
  });

  it('should return a post', function(done){

    var app = express();
    serviceLoader.loadService(app, new serviceTest());

    request(app)
    .post('/one/12')
    .expect('{"id":"12","method":"post"}', done);
  });

  it('should return a delete', function(done){

    var app = express();
    serviceLoader.loadService(app, new serviceTest());

    request(app)
    .delete('/one/12')
    .expect('{"id":"12","method":"delete"}', done);
  });

  it('should return a put', function(done){

    var app = express();
    serviceLoader.loadService(app, new serviceTest());

    request(app)
    .put('/one/12')
    .expect('{"id":"12","method":"put"}', done);
  });

  it('should return a patch', function(done){

    var app = express();
    serviceLoader.loadService(app, new serviceTest());

    request(app)
    .patch('/one/12')
    .expect('{"id":"12","method":"patch"}', done);
  });
});
