import Hal from "../../../src/js/hypermedia/hal";

@Hal.halEntity("/titles/:id")
export default class Title {

  @Hal.resourceId()
  id = 0;

  constructor(id, name, author) {
    this.id = id;
    this.name = name;
    this.author = author;
  }
}
