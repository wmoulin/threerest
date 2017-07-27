import Hal from "../../../src/ts/hypermedia/hal";

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
