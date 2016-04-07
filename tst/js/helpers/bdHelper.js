var assert = require("assert");

import Author from "../models/author";
import Serie from "../models/serie";
var db = require('../hal/database');

export default class BdHelper {

  /*
   * Traitement de l'ensemble des données pour transformer les entrées
   * auteur de la base de donnée en suite d'objet Author
   */
  static getAuthors(json) {
    var arr = [];
    var len = json["authors"].length;
    for (var i = 0; i < len; i++) {
        arr.push(BdHelper.getAuthor(json["authors"][i], i));
    }
    return arr;
  }

  /*
   * A partir des données d'un auteur, on crée un objet Author.
   * Chaque objet Serie est crée et ajouté à l'Author.
   */
  static getAuthor(json, id) {
    var series = [];
    for (var i=0 ; i < json["series"].length ; i++)
    {
      series.push(BdHelper.getSerie(db, json["series"][i]["id"]));
    }
    return new Author(id, json["first_name"], json["last_name"], series);
  }

  /*
   * A partir des données d'une série, on crée un objet Serie.
   */
  static getSerie(json, id) {
    return new Serie(id, json["series"][id]["name"]);
  }

  // Renvoie l'objet json correspondant à la catégorie, au critère voulue
  static searchParams(json, categoryField, searchField, searchVal) {
    for (var i=0 ; i < json[categoryField].length ; i++)
    {
      if (json[categoryField][i][searchField] == searchVal) {
        return json[categoryField][i]
      }
    }
  }
}
