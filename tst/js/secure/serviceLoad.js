'use strict';
var express = require('express');
var request = require('supertest');

import serviceOne from"./service/service";
var serviceLoader = require("../../../src/js/service-loader");
import Secure from "../../../src/js/services/secure";
import UnauthorizedError from "../../../src/js/exceptions/unauthorizedError";
var assert = require("assert");
var jwt = require("jsonwebtoken");
var fs = require("fs");
var path = require("path");


describe('Laod secure service rest', function(){
  it('should authorized for role user', function(done){

    var app = express();
    app.use(jwtMiddleWare);
    serviceLoader.loadService(app, new serviceOne());

    request(app)
    .get('/one/user/12')
    .set('Authorization', Secure.BEARER_HEADER + generateToken(["USER"]))
    .expect(200, '{"id":"12"}', done);
  });

  it('should not authorized for role admin', function(done){

    var app = express();
    app.use(jwtMiddleWare);
    serviceLoader.loadService(app, new serviceOne());

    request(app)
    .get('/one/user/12')
    .set('Authorization', Secure.BEARER_HEADER + generateToken(["ADMIN"]))
    .expect(401, done);
  });

  it('should authorized for all roles', function(done){

    var app = express();
    app.use(jwtMiddleWare);
    serviceLoader.loadService(app, new serviceOne());

    request(app)
    .get('/one/adminuser/12')
    .set('Authorization', 'Bearer application/json')
    .set('Authorization', Secure.BEARER_HEADER + generateToken(["ADMIN"]))
    .expect(200, '{"id":"12"}');

    request(app)
    .get('/one/adminuser/12')
    .set('Authorization', 'Bearer application/json')
    .set('Authorization', Secure.BEARER_HEADER + generateToken(["USER"]))
    .expect(200, '{"id":"12"}', done);
  });
});

/* Generate a JWT token for request */
function generateToken(roles) {
  var cert = fs.readFileSync(path.join(__dirname, './cert/priv.pem'));  // get private key
  return jwt.sign({ user: getUser(roles) }, cert, { algorithm: "RS256"/*["HS256", "RS512"]*/});
}

function getUser(roles) {
  return {
    name: "test",
    roles: roles
  }
}

/* Express middleware for extract user from JWT Token */
function jwtMiddleWare(request, response, next) {
      if (request && request.get && request.get(Secure.HEADER_AUTH) && request.get(Secure.HEADER_AUTH).slice(0, Secure.BEARER_HEADER.length) == Secure.BEARER_HEADER) {
        let token = request.get(Secure.HEADER_AUTH).substring(Secure.BEARER_HEADER.length);
        var cert = fs.readFileSync(path.join(__dirname, './cert/pub.pem'));  // get public key
        jwt.verify(token, cert, { algorithms: ["RS256"]}, function(err, decoded) {

            request.user = decoded.user;
            if (err) {
              next(err);
            } else {
              next();
            }
        });
      } else {
        next();
      }
    }
