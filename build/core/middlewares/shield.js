"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auth = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _config = require("../../config");

var _httpErrorHandler = require("../errors/httpErrorHandler");

class Auth {
  static async user(request, response, next) {
    const authorization = request.get("authorization");

    if (!authorization) {
      return response.status(400).json({
        message: "Token not found"
      });
    }

    const [, token] = authorization.split(" ");

    try {
      const decode = JSON.stringify((0, _jsonwebtoken.verify)(token, _config.JWT_SECRET));
      const subject = JSON.parse(decode);

      if (!decode) {
        throw new Error(_httpErrorHandler.HttpErrorHandler.targetError({
          message: "Unidentified decode",
          status: 400
        }));
      }

      request.userId = subject.userId;
      return next();
    } catch (error) {
      return response.status(401).json({
        error: "Unauthorized token"
      });
    }
  }

}

exports.Auth = Auth;