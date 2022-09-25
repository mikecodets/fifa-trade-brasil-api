"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserSchema = void 0;

var yup = _interopRequireWildcard(require("yup"));

var _httpErrorHandler = require("../../core/errors/httpErrorHandler");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class UserSchema {
  static async validate(user) {
    const schema = yup.object({
      email: yup.string().required("The email is a required").email("Email must be valid"),
      password: yup.string().required("The password is a required").min(8, "Password must be at least 8 characters long").max(16, "Password must be a maximum of 16 characters")
    });
    return schema.validate(user).catch(error => {
      throw new Error(_httpErrorHandler.HttpErrorHandler.targetError({
        message: error.message,
        status: 401
      }));
    });
  }

}

exports.UserSchema = UserSchema;