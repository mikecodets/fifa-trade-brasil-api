"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PORT = exports.JWT_SECRET = exports.BCRYPT_SALT = void 0;

require("dotenv/config");

var _envalid = require("envalid");

const {
  PORT,
  JWT_SECRET,
  BCRYPT_SALT
} = (0, _envalid.cleanEnv)(process.env, {
  PORT: (0, _envalid.port)(),
  JWT_SECRET: (0, _envalid.str)(),
  BCRYPT_SALT: (0, _envalid.num)()
});
exports.BCRYPT_SALT = BCRYPT_SALT;
exports.JWT_SECRET = JWT_SECRET;
exports.PORT = PORT;