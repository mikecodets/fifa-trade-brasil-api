"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserService = void 0;

var _bcrypt = require("bcrypt");

var _jsonwebtoken = require("jsonwebtoken");

var _client = _interopRequireDefault(require("../../client"));

var _config = require("../../config");

var _httpErrorHandler = require("../../core/errors/httpErrorHandler");

var _user = require("./user.schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserService {
  static async create(user) {
    if (!user.acceptTermsAndConditions) {
      throw new Error(_httpErrorHandler.HttpErrorHandler.targetError({
        message: "User must accept terms",
        status: 401
      }));
    }

    await _user.UserSchema.validate(user);
    const isUser = await _client.default.user.findUnique({
      where: {
        email: user.email
      }
    });

    if (isUser) {
      throw new Error(_httpErrorHandler.HttpErrorHandler.targetError({
        message: "User already exists",
        status: 401
      }));
    }

    const salt = (0, _bcrypt.genSaltSync)(_config.BCRYPT_SALT);
    user.password = (0, _bcrypt.hashSync)(user.password, salt);
    return await _client.default.user.create({
      data: user
    }).catch(error => {
      throw new Error(_httpErrorHandler.HttpErrorHandler.targetError({
        message: error.message,
        status: 400
      }));
    });
  }

  static async findMany() {
    return await _client.default.user.findMany().catch(error => {
      throw new Error(_httpErrorHandler.HttpErrorHandler.targetError({
        message: error.message,
        status: 400
      }));
    });
  }

  static async login(user) {
    await _user.UserSchema.validate(user);
    const isUser = await _client.default.user.findUnique({
      where: {
        email: user.email
      }
    }).catch(error => {
      throw new Error(_httpErrorHandler.HttpErrorHandler.targetError({
        message: error.message,
        status: 400
      }));
    });

    if (!isUser) {
      throw new Error(_httpErrorHandler.HttpErrorHandler.targetError({
        message: "invalid credentials",
        status: 401
      }));
    }

    const compare = (0, _bcrypt.compareSync)(user.password, isUser.password);

    if (!compare) {
      throw new Error(_httpErrorHandler.HttpErrorHandler.targetError({
        message: "invalid credentials",
        status: 401
      }));
    }

    if (!isUser.status) {
      throw new Error(_httpErrorHandler.HttpErrorHandler.targetError({
        message: "User disabled, contact your administrator",
        status: 401
      }));
    }

    const token = (0, _jsonwebtoken.sign)({
      userId: isUser.id
    }, _config.JWT_SECRET, {
      expiresIn: 60 * 60
    });
    return {
      token,
      user: isUser
    };
  }

}

exports.UserService = UserService;