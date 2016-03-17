'use strict';

var express = require('express');
var request = require('supertest');

import serviceOne from"./serviceOne";
var serviceLoader = require("../../src/js/service-loader");
var assert = require("assert");

describe('Laod service rest', function(){
  it('should return a new route', function(done){

    var app = express();
    serviceLoader.loadService(app, new serviceOne());

    request(app)
    .get('/test/12')
    .expect('{"id":"12"}', done);
  });

  it('should return the value', function(done){
    var app = express();

    app.route('/:foo')
    .get(function(req, res) {
      res.send(req.params.foo);
    });

    request(app)
    .get('/test')
    .expect('test', done);
  });

});
