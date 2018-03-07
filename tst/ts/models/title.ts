import Hal from "../../../src/ts/hypermedia/hal";

@Hal.halEntity("/titles/:id")
export default class Title {

  @Hal.resourceId()
  id = 0;

  constructor(id, public name, public author) {
    this.id = id;
    this.name = name;
    this.author = author;
  }
}
