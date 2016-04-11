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
  
  When you add a Hal decorator, the response of your service is compose like that :
  ```
  {
    "_links": {
      "self": {
        "href": "the link self"
      }
    },
    "data": {
    ...
    }
  }
  ```
  Data is the original response of your service.
  
### Work with model

If you want to add link to entity, you must decorate the entity class like that :
```
@Hal.halEntity("/authors/:id")
export default class Author {

  @Hal.resourceId()
  id = 0;

  constructor(id, firstName, lastName, series) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.series = series;
  }
}
```
The @Hal.halEntity decorator indicate to the framework the URI to find this resource. The ID is specified by putting a @Hal.resourceId() decorator on the right properties.
So when you add a author in your response, Threerest will add a structure with link and data. 
```
{
  "_links": {
    "self": {
      "href": "/authors/3"
    }
  },
  "data": {
    "_links": {
      "self": {
        "href": "/authors/3"
      }
    },
    "firstName": "Denis",
    "id": "3",
    "lastName": "Bajram",
    "series": [
      {
        "_links": {
          "self": {
            "href": "/series/6"
          }
        },
        "idSerie": 6,
        "name": "Expérience mort"
      },
      {
        "_links": {
          "self": {
            "href": "/series/7"
          }
        },
        "idSerie": 7,
        "name": "Universal War One"
      },
      {
        "_links": {
          "self": {
            "href": "/series/8"
          }
        },
        "idSerie": 8,
        "name": "Universal War Two"
      }
    ]
  }
}
```
