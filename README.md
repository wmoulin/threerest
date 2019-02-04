# Threerest -  A Hypermedia Framework

  Threerest is a light and powerful framework for creating hypermedia API for [node](http://nodejs.org). For the moment, only HAL concept is implement for level 3.

## Installation

  Threerest is a npm module so you have just add it to your project like this :
  
  if npm < 5
  ```
  npm install threerest --save
  ```
  if npm > 5  
  ```
  npm i threerest
  ```
  or manually add the dependency in ```package.json```

## Using Threerest

  Threerest is base on the ES7 decorator. You just have to put a service decorator on a class to transform into service REST. To create a method, you can use the method decorators and if you want to make your service a Hypermedia Service, you must add the Hal decorator, it's so simple. This is an example, it's more telling :

  ```javascript
  import { Service } from "threerest";
  import { Methods } from "threerest";
  import { Hal } from "threerest";

  @Service.path("/authors")  // To set a part of the path of the API
  export default class ServiceAuthors {

    @Methods.get("/") // To set the verb 
    @Hal.halServiceMethod() // To add hypermedia
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
```javascript
@Service.path("/three")
export default class ServiceManageStatus {

  @Method.get("/:id")
  @convert(Param)
  testGet(value) {
    value.method = "get"
    return value;
  }

}
```

In this example, the parameter *value* will be type of ```Param```, and his id attribut will be set with the request parameter exctract from the URL.

#### Parameter decorators

For all these decorators with parameter, this one can be a chained attributs, example `myFirstLevel.mySecondLevel.attribut` and you can use un table index accessor like `myObjecy.tab[0].attribut`.

##### Params

Use @Params() or @Params("id") for get all or only one field from request param object. 

##### Body

Use @Body() or @Body("id") for get all or only one field from request body object. 

##### Headers

Use @Headers() or @Headers("header") for get all or only one field from request header object. 

##### Query

Use @Query() or @Query("header") for get all or only one field from request query object (query parameters). 

##### Request

Use @Request() for get request object. 

##### Response

Use @Response() for get response object. 

###### Example

```javascript
@Service.path("/one")
export default class ServiceTestParameter {

  @Methods.get("/:id")
  testGet(@Params("id") id, @Body() body, @Request() request, @Response() response) {
    return {id, body, response: !!response.end, request: !!request.params["id"] };
  }


  @Methods.put("/:id")
  testPut(@Headers("Custom") myHeader, @Query("coucou") query) {
    return {myHeader, query};
  }

}
```

In this example :
+ @Params("id") get the id from the url parameter.
+ @Body() get all the body from the request
+ @Request is the request object (like express.Request)
+ @Response is the response object (like express.Response)
+ @Headers("Custom") get the value of the 'Custom' header request
+ @Query("coucou") get the value from the query parameter 'coucou' (http://domain/context/service?coucou=vale)


#### Secure decorator

##### Presentation

For secure some methods service, use the 'secure' decorator. He take the user from the request and compare the **roles property** on this one with roles parameters passed to the decorator.


![alt text][secure]

[secure]: ./doc_resources/threerest.jpg "secure presentation diagram"

###### Example

A service that allow call `testGetUser` for *USER* role and `testGetAdmin` for *USER* or *ADMIN* role :

```javascript
@Service.path("/one")
export default class ServiceTest {

  @Method.get("/user/:id")
  @convert(Param)
  @Secure.secure(["USER"])
  testGetUser(value) {
    return value;
  }

  @Method.get("/adminuser/:id")
  @convert(Param)
  @Secure.secure(["USER", "ADMIN"])
  testGetAdmin(value) {
    return value;
  }
}
```

You just must have a middleware for write user property on the request. This example parse a token JWT that contain the user

```javascript
/* Express middleware for extract user from JWT Token */
function jwtMiddleWare(request, response, next) {
  if (request && request.get && request.get(Secure.HEADER_AUTH) && request.get(Secure.HEADER_AUTH).slice(0, Secure.BEARER_HEADER.length) == Secure.BEARER_HEADER) {
    let token = request.get(Secure.HEADER_AUTH).substring(Secure.BEARER_HEADER.length);
    var cert = fs.readFileSync(path.join(__dirname, "./cert/pub.pem"));  // get public key
    jwt.verify(token, cert, { algorithms: ["RS256"] }, function (err, decoded) {

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
```

##### tips : generate with ssh-keygen

1. generate private key in PKCS#1 format
```shell
openssl genrsa -f4 -out private.txt 4096 
```
2. export public key
```shell
openssl rsa -in private.txt -outform PEM -pubout -out public.pem
```
3. export private key to PKCS#8 format
```shell
openssl pkcs8 -topk8 -inform pem -in private.txt -outform PEM -nocrypt -out private.pem
```

#### HTTP status management

There's multiple solution for this:
1. If the method return a RestResult instance, the code from this instance and the data will return :
```javascript
  @Method.get("/:id")
  @convert(Param)
  testGet(value) {
    return new RestResult(222, value);
  }
```
2. We can use the Method decorator that take a status in second parameter
```javascript
  @Method.get("/status/:id", 222)
  @convert(Param)
  testGetStatus(value) {
    value.method = "get"
    return value;
  }
```
3. The service class can implement a method named ```manageStatus```. this method take the request objet and the service return value in parameter and must return the status
```javascript
@Service.path("/three")
export default class ServiceManageStatus {

  @Method.get("/:id")
  @convert(Param)
  testGet(value) {
    value.method = "get"
    return value;
  }

  manageStatus(request, valueToReturn) {
    if(!valueToReturn && request.method.toUpperCase() == "GET") return 404;
    return 222;
  }

}
```
4. Use the default static method ```manageStatus``` from Service class. You can overhide it if you need :
    1. return value and post request return 201
    2. no return value and post request return 204
    3. no return value and get request return 404
    4. otherwise return 200

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
@Hal.halEntity("/authors/:id") // To set the path of the API, that's link id of the path with the id of the model
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
