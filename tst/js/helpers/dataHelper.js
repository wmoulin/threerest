var assert = require("assert");
var assert = require("assert");

export default class DataHelper {

  /**
   * Return the complete data for the test.
   *
   * @method
   * @returns {json}
   */
  static getTestData() {
    return [
        {firstName:"Peter", lastName:"Parker", secretIdentity: "Spiderman", offset:"0"},
        {firstName:"Bruce", lastName:"Wayne", secretIdentity: "Batman", offset:"1"},
        {firstName:"Clark", lastName:"Kent", secretIdentity: "Superman", offset:"2"},
        {firstName:"Tony", lastName:"Stark", secretIdentity: "Iron Man", offset:"3"},
        {firstName:"Steve", lastName:"Roders", secretIdentity: "Captain America", offset:"4"},
        {firstName:"Bruce", lastName:"Banner", secretIdentity: "Hulk", offset:"5"},
        {firstName:"Natasha", lastName:"Romanoff", secretIdentity: "Black Widow", offset:"6"},
        {firstName:"James", lastName:"Howlett", secretIdentity: "Wolverine", offset:"7"},
        {firstName:"Matt", lastName:"Murdock", secretIdentity: "Daredevil", offset:"8"},
        {firstName:"Wade", lastName:"Wilson", secretIdentity: "Deadpool", offset:"9"},
        {firstName:"Elektra", lastName:"Natchios", secretIdentity: "Elektra", offset:"10"},
        {firstName:"Dave", lastName:"Lizewski", secretIdentity: "Kick-Ass", offset:"11"},
        {firstName:"Franck", lastName:"Castle", secretIdentity: "Punisher", offset:"12"}
      ];
  }

  /**
   * Test all the data return from the test.
   * The firstName, the lastName, the secretIdentity and the offset is test.
   *
   * @method
   */
  static testOneEntry(data, expected) {
    assert.equal(data.firstName, expected.firstName);
    assert.equal(data.lastName, expected.lastName);
    assert.equal(data.secretIdentity, expected.secretIdentity);
    assert.equal(data.offset, expected.offset);
  }

  /**
   * Test all the data return from the test.
   * The firstName, the lastName, the secretIdentity and the offset is test.
   *
   * @method
   */
  static testData(data, expected, index, length) {
    for (var i = index; i < length; i++) {
      DataHelper.testOneEntry(data[i], expected[i]);
    }
  }

}
