'use strict';
var express = require('express');
var request = require('supertest');

import serviceOne from"./service/serviceOne";
var serviceLoader = require("../../../src/js/service-loader");
var assert = require("assert");

describe('Laod simple service rest', function(){
  it('should return a new route', function(done){

    var app = express();
    serviceLoader.loadService(app, new serviceOne());

    request(app)
    .get('/one/12')
    .expect('{"id":"12"}', done);
  });

  it('should return the value', function(done){
    let app = express();

    app.route('/:foo')
    .get(function(req, res) {
      res.send(req.params.foo);
    });

    request(app)
    .get('/test')
    .expect('test', done);
  });

  it('should return a new route', function(done){
    let path = require("path");
    let app = express();
    serviceLoader.loadServices(app, path.join(__dirname, "./service"));

    request(app)
    .get('/one/12')
    .expect('{"id":"12"}', () => {
      request(app)
      .get('/two/12')
      .expect('{"id":"12"}', done);
    });

  });

});
