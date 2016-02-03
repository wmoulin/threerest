"use strict"
import serviceTest from"./serviceTest";
import * as serviceLoader from"./service-loader";

import express from "express";

var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});


serviceLoader.loadService(app, new serviceTest());

app.listen(3000, () => {console.log("Express start...");});
