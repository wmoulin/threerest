'use strict';

var express = require('express');
var request = require('supertest');

import ServiceAuthors from"./serviceAuthors";
var serviceLoader = require("../../../src/js/service-loader");
var assert = require("assert");

describe('Load service rest Authors', function(){
  it('should add self link', function(done){

    var app = express();
    serviceLoader.loadService(app, new ServiceAuthors());

    request(app)
    .get('/authors')
    .expect(function(res) {
      console.log(res.body.data[0]._links);
      console.log(res.body.data[0].series[0]._links);
      assert.equal(res.body._links.self.href, '/authors');
      assert.equal(res.body.data[0]._links.self.href, '/authors/0');
    }).end(done);
  });

});
