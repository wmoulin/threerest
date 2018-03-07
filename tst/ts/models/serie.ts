import Hal from "../../../src/ts/hypermedia/hal";

@Hal.halEntity("/series/:id")
export default class Serie {

  @Hal.resourceId()
  idSerie = 0;

  constructor(idSerie, public name, public author?) {
    this.idSerie = idSerie;
    this.name = name;
    this.author = author;
  }
}
