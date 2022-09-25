"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserController = void 0;

var _user = require("./user.service");

class UserController {
  static async create(request, response) {
    const user = await _user.UserService.create(request.body);
    return response.status(201).json({
      message: "🎉 user created successfully",
      user
    });
  }

  static async findMany(request, response) {
    const users = await _user.UserService.findMany();
    return response.status(200).json({
      message: "🎉 users returned successfully",
      users
    });
  }

  static async login(request, response) {
    const {
      user,
      token
    } = await _user.UserService.login(request.body);
    return response.status(200).json({
      message: "🎉 user logged successfully",
      user,
      token
    });
  }

}

exports.UserController = UserController;