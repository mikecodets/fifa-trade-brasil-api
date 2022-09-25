"use strict";

var _user = require("../user.builder");

describe("UserBuilder", () => {
  describe("constructor", () => {
    it("should be generate a new instance of UserBuilder", () => {
      const userBuilder = new _user.UserBuilder();
      expect(userBuilder).toBeInstanceOf(_user.UserBuilder);
    });
  });
  describe("build", () => {
    it("should generate builder", () => {
      const sut = new _user.UserBuilder().build();
      expect(sut).not.toBeUndefined();
    });
    it("should generate a builder when it is passed arguments in its constructor", () => {
      const sut = new _user.UserBuilder(true).build();
      expect(sut).not.toBeUndefined();
    });
  });
});