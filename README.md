# Threerest -  A Hypermedia Framework#

  Threerest is a light and powerful framework for creating hypermedia API for [node](http://nodejs.org).

## Installation

  Threerest is a npm module so you have just add it to your project like this :
  ```
  npm install threerest --save
  ```
  
## Using Threerest

  Threerest is base on the ES7 decorator.You just have to put a Service decorator on a class to transform into service. To create a method, you can use the Method decorator ans if you wnat to make your service a Hypermedia Service, you must add the Hal decorator. This is an example :
  ```
  import { Service } from "threerest";
  import { Methods } from "threerest";
  import { Hal } from "threerest";

  @Service.path("/authors")
  export default class ServiceAuthors {

    @Methods.get("/")
    @Hal.halServiceMethod()
    getAll() {
      .....
    }
  }
  ```
  
