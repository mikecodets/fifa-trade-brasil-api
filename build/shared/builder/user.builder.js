"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserBuilder = void 0;

var _faker = require("@faker-js/faker");

var _bcrypt = require("bcrypt");

var _config = require("../../config");

class UserBuilder {
  constructor(hash) {
    const password = hash ? (0, _bcrypt.hashSync)("test-true", _config.BCRYPT_SALT) : _faker.faker.internet.password();
    this.id = _faker.faker.database.mongodbObjectId();
    this.name = _faker.faker.name.fullName();
    this.email = _faker.faker.internet.email();
    this.password = password;
    this.status = true;
    this.acceptTermsAndConditions = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  build() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      status: this.status,
      acceptTermsAndConditions: this.acceptTermsAndConditions,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

}

exports.UserBuilder = UserBuilder;