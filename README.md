# Threerest -  A Hypermedia Framework#

  Threerest is a light and powerful framework for creating hypermedia API for [node](http://nodejs.org). For the moment, only HAL concept is implement.

## Installation

  Threerest is a npm module so you have just add it to your project like this :
  ```
  npm install threerest --save
  ```
  or manually add the dependency in ```package.json```

## Using Threerest

  Threerest is base on the ES7 decorator. You just have to put a service decorator on a class to transform into service REST. To create a method, you can use the method decorators and if you want to make your service a Hypermedia Service, you must add the Hal decorator, it's so simple. This is an example, it's more telling :

  ```javascript
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

### REST level 2

If you don't need hypermedia, threerest can do it. You must just mark the class with service decorator, the methods with http verb method decorators and use service utility for load router in express.

```javascript
import { Convert, Methods, Service } from "threerest";
import Param from "./param";

@Service.path("/test")
export default class ServiceTest {

  @Method.get("/:id")
  @Convert(Param)
  testGet(value) {
    return value;
  }
}
```

#### Service decorator

This decorator take only one parameter and he must place on a class. the parameter is the basic path for the service.
```javascript
@Service.path("/test")
```
In the example, the service can be execute with the  url ``` http:\\localhost:1234\test ```

#### Method decorator

For the moment, only GET, POST, DELETE, PUT and PATCH are implements
```javascript
@Method.get("/:id")
```
In the example, the service method will be execute using the  url ``` http:\\localhost:1234\test\12 ```. Without convert, the method will call with :
+ request parameters
+ request
+ response

With convert, the method will call with :
+ convert object with the request parameters
+ request
+ response

#### Convert decorator

Using for convert the parameter(s) into particular JavaScript object.
In the example, we convert the request parameter, into Param object :

```javascript
export default class Param {

  id = undefined;
  name = "";

  constructor(name, password) {
    this.name = name;
    this.password = password;
  }

};
```
And the first parameter method contain an object ```Param``` with the property id witch contain the value of the request parameter.

### REST level 3

  When you add a Hal decorator, the response of your service is compose like that :
  ```json
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

#### Work with model

If you want to add link to entity, you must decorate the entity class like that :
```javascript
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
```json
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

#### Work with pagination

If your service returns a given list, you can easily paginate the return by adding a boolean true to the decorator.  @Pagination.paginate()
```javascript
  @Methods.get("/")
  @Hal.halServiceMethod(true)
  getAll() {
    ....
  }
```
In this case, threerest react when tou add the parameter pageSize and/or pageIdx in your request. For example, the URI myAPI/authors send all the authors. If you want only the first 5 results, you just add have to send this request
```
  myAPI/authors?pageSize=5
```
With the decorator, the pagination will be automatical executed.
If you want to start to any other position, you must use pageIdx
```
  myAPI/authors?pageSize=5&pageIdx=2
```
This URI send the first 5 results from the position 2 of the list.

##### Configure pagination

If you want to use other terms that pageSize and pageIdx , you can specify them in the decorator.

```javascript
  @Methods.get("/")
  @Hal.halServiceMethod({pageSize:"anotherlimit",pageIdx:"index"})
  getAll() {
    ....
  }
```

The URI becomes
```
  myAPI/authors?anotherlimit=5&index=2
```
