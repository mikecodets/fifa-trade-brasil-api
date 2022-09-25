"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Routes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _csv = require("../../modules/csv/csv.controller");

var _user = require("../../modules/user/user.controller");

var _multer2 = require("../middlewares/multer");

var _shield = require("../middlewares/shield");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Routes {
  constructor() {
    this.firstVersion = (0, _express.Router)();
    this.firstVersion.post("/user", _user.UserController.create);
    this.firstVersion.post("/user/login", _user.UserController.login);
    this.firstVersion.get("/user/find-many", _shield.Auth.user, _user.UserController.findMany);
    this.firstVersion.get("/csv/find-many", _shield.Auth.user, _csv.CSVController.findMany);
    this.firstVersion.post("/csv/upload", (0, _multer.default)({
      storage: _multer2.storage
    }).single("csv"), _shield.Auth.user, _csv.CSVController.upload);
  }

}

exports.Routes = Routes;