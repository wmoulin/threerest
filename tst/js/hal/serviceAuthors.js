import Hal from "../../../src/js/hypermedia/hal";
import Service from "../../../src/js/service";
import Methods from "../../../src/js/services/methods";
import convert from "../../../src/js/convert";
import Param from "../param";
import Pagination from "../../../src/js/services/pagination";
import NotFoundError from "../../../src/js/exceptions/NotFoundError";


var db = require('./database');

@Service.path("/authors")
export default class ServiceAuthors {

  @Methods.get("/")
  @Hal.halServiceMethod()
  getAll() {
    return getAuthors(db);
  }

  @Methods.get("/:id")
  @Hal.halServiceMethod()
  getswitchId(value) {
    var id = value.params.id;
  	var result = searchParams(db, 'authors', 'id', id);
  	if (result) {
      return getAuthor(result, id);
  	}
    throw new NotFoundError();
  }
}

/*
 * Traitement de l'ensemble des données pour transformer les entrées
 * auteur de la base de donnée en suite d'objet Author
 */
function getAuthors(json) {
  var arr = [];
  var len = json["authors"].length;
  for (var i = 0; i < len; i++) {
      arr.push(getAuthor(json["authors"][i], i));
  }
  return arr;
}

/*
 * A partir des données d'un auteur, on crée un objet Author.
 * Chaque objet Serie est crée et ajouté à l'Author.
 */
function getAuthor(json, id) {
  var series = [];
  for (var i=0 ; i < json["series"].length ; i++)
  {
    series.push(getSerie(db, json["series"][i]["id"]));
  }
  return new Author(id, json["first_name"], json["last_name"], series);
}

/*
 * A partir des données d'une série, on crée un objet Serie.
 */
function getSerie(json, id) {
  return new Serie(id, json["series"][id]["name"]);
}

// Renvoie l'objet json correspondant à la catégorie, au critère voulue
function searchParams(json, categoryField, searchField, searchVal) {
  for (var i=0 ; i < json[categoryField].length ; i++)
  {
    if (json[categoryField][i][searchField] == searchVal) {
      return json[categoryField][i]
    }
  }
}


@Hal.halEntity("/authors/:id")
class Author {

  @Hal.resourceId()
  id = 0;

  constructor(id, firstName, lastName, series) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.series = series;
  }
}

@Hal.halEntity("/series/:id")
class Serie {

  @Hal.resourceId()
  idSerie = 0;

  constructor(idSerie, name, author) {
    this.idSerie = idSerie;
    this.name = name;
    this.author = author;
  }
}
