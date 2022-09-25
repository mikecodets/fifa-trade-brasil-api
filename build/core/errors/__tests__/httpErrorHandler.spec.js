"use strict";

var _httpErrorHandler = require("../httpErrorHandler");

describe("Target Error", () => {
  it("should return string http error", () => {
    const error = _httpErrorHandler.HttpErrorHandler.targetError({
      message: "Hello, i'm an http error",
      status: 0
    });

    expect(error).toEqual(JSON.stringify({
      message: "Hello, i'm an http error",
      status: 0
    }));
  });
  it("should return json http error", () => {
    const parser = _httpErrorHandler.HttpErrorHandler.errorParser(new Error(JSON.stringify({
      message: "Hello, i'm an http error",
      status: 0
    })));

    expect(parser).toMatchObject({
      message: "Hello, i'm an http error",
      status: 0
    });
  });
});