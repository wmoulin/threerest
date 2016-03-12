'use strict';

var express = require('express');
var request = require('supertest');

import servicePagination from"./servicePagination";
import {ServicePaginationCustom as servicePaginationCustom} from"./servicePagination";
var serviceLoader = require("../../../src/js/service-loader");
var assert = require("assert");

describe.skip('Check Pagination all result', function(){
  it('should return a new route', function(done){

    var app = express();
    serviceLoader.loadService(app, new servicePagination());

    request(app)
    .get('/pagination/666')
    .expect('[{"firstName":"John","lastName":"Doe"},{"firstName":"Anna","lastName":"Smith"},{"firstName":"Peter","lastName":"Jones"},{"_links":{"self":{"href":"/pagination/666"}}}]', done);
  });

});

describe.skip('Check Pagination only with limite', function(){
  it('should return a new route', function(done){

    var app = express();
    serviceLoader.loadService(app, new servicePaginationCustom());

    request(app)
    .get('/paginationCustom/666?limite=2')
    .expect('[{"firstName":"John","lastName":"Doe"},{"firstName":"Anna","lastName":"Smith"},{"_links":{"self":{"href":"/paginationCustom/666?limite=2"}}}]', done);
  });

});

describe.skip('Check Pagination only with offset2', function(){
  it('should return a new route', function(done){

    var app = express();
    serviceLoader.loadService(app, new servicePaginationCustom());

    request(app)
    .get('/paginationCustom/666?offset2=1')
    .expect('[{"firstName":"Anna","lastName":"Smith"},{"firstName":"Peter","lastName":"Jones"},{"_links":{"self":{"href":"/paginationCustom/666?offset2=1"}}}]', done);
  });

});

describe.skip('Check Pagination with limite and offset2', function(){
  it('should return a new route', function(done){

    var app = express();
    serviceLoader.loadService(app, new servicePaginationCustom());

    request(app)
    .get('/paginationCustom/666?limite=1&offset2=0')
    .expect('[{"firstName":"John","lastName":"Doe"},{"_links":{"self":{"href":"/paginationCustom/666?limite=1&offset2=0"}}}]', done);
  });

});

describe.skip('Check Pagination with limit', function(){
  it('should return a new route', function(done){

    var app = express();
    serviceLoader.loadService(app, new servicePagination());

    request(app)
    .get('/pagination/666?limit=2')
    .expect('[{"firstName":"John","lastName":"Doe"},{"firstName":"Anna","lastName":"Smith"},{"_links":{"self":{"href":"/pagination/666?limit=2"}}}]', done);
  });

});

describe.skip('Check Pagination with limit and offset', function(){
  it('should return a new route', function(done){

    var app = express();
    serviceLoader.loadService(app, new servicePagination());

    request(app)
    .get('/pagination/666?offset=2')
    .expect('[{"firstName":"Peter","lastName":"Jones"},{"_links":{"self":{"href":"/pagination/666?offset=2"}}}]', done);
  });

});

describe.skip('Check Pagination with limit and offset', function(){
  it('should return a new route', function(done){

    var app = express();
    serviceLoader.loadService(app, new servicePagination());

    request(app)
    .get('/pagination/666?limit=2&offset=1')
    .expect('[{"firstName":"Anna","lastName":"Smith"},{"firstName":"Peter","lastName":"Jones"},{"_links":{"self":{"href":"/pagination/666?limit=2&offset=1"}}}]', done);
  });

});
