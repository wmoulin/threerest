"use strict";
import * as services from"./serviceTest";
import * as serviceLoader from"./service-loader";

import express from "express";

var app = express();

app.get("/", function(req, res){
  res.send("hello world");
});

// load the service Test
serviceLoader.loadService(app, new services.ServiceTest());
// Load the service Error
serviceLoader.loadService(app, new services.ServiceError());

app.listen(3000, () => {console.log("Express start...");});
