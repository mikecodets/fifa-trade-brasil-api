"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpErrorHandler = void 0;

class HttpErrorHandler {
  static targetError({
    message,
    status
  }) {
    return JSON.stringify({
      message,
      status
    });
  }

  static errorParser(error) {
    return JSON.parse(error.message);
  }

}

exports.HttpErrorHandler = HttpErrorHandler;