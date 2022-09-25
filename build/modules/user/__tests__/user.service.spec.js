"use strict";

var _user = require("../../../shared/builder/user.builder");

var _singleton = require("../../../singleton");

var _user2 = require("../user.service");

describe("UserService", () => {
  describe("create", () => {
    it("should fail when the user does not accept the terms and conditions of use", async () => {
      const user = new _user.UserBuilder().build();
      await _user2.UserService.create({ ...user,
        acceptTermsAndConditions: false
      }).catch(error => {
        expect(error.message).toEqual(JSON.stringify({
          message: "User must accept terms",
          status: 401
        }));
      });
    });
    it("should fail when the user already exists", async () => {
      const user = new _user.UserBuilder().build();

      _singleton.prismaMock.user.findUnique.mockResolvedValue(user);

      await _user2.UserService.create(user).catch(error => {
        expect(error.message).toEqual(JSON.stringify({
          message: "User already exists",
          status: 401
        }));
      });
    });
    it("should fail when unable to save user", async () => {
      const user = new _user.UserBuilder().build();

      _singleton.prismaMock.user.create.mockRejectedValue({
        message: "failed to save user"
      });

      await _user2.UserService.create(user).catch(error => {
        expect(error.message).toEqual(JSON.stringify({
          message: "failed to save user",
          status: 400
        }));
      });
    });
    it("should create a new user", async () => {
      const user = new _user.UserBuilder().build();

      _singleton.prismaMock.user.create.mockResolvedValue(user);

      const sut = await _user2.UserService.create(user);
      expect(sut.id).toEqual(user.id);
      expect(sut.createdAt).toEqual(user.createdAt);
      expect(sut.updatedAt).toEqual(user.updatedAt);
    });
  });
  describe("find many", () => {
    it("should fail when not returning users", async () => {
      _singleton.prismaMock.user.findMany.mockRejectedValue({
        message: "failed to return users"
      });

      await _user2.UserService.findMany().catch(error => {
        expect(error.message).toEqual(JSON.stringify({
          message: "failed to return users",
          status: 400
        }));
      });
    });
    it("should find many users", async () => {
      const users = Array(5).fill({}).map(() => new _user.UserBuilder().build());

      _singleton.prismaMock.user.findMany.mockResolvedValue(users);

      const sut = await _user2.UserService.findMany();
      expect(sut).toMatchObject(users);
    });
  });
  describe("login", () => {
    it("should fail when not returning a user", async () => {
      const {
        email,
        password
      } = new _user.UserBuilder().build();

      _singleton.prismaMock.user.findUnique.mockRejectedValue({
        message: "failed to return user"
      });

      await _user2.UserService.login({
        email,
        password
      }).catch(error => {
        expect(error.message).toEqual(JSON.stringify({
          message: "failed to return user",
          status: 400
        }));
      });
    });
    it("should fail when user does not exist", async () => {
      const {
        email,
        password
      } = new _user.UserBuilder().build();

      _singleton.prismaMock.user.findUnique.mockResolvedValue(null);

      await _user2.UserService.login({
        email,
        password
      }).catch(error => {
        expect(error.message).toEqual(JSON.stringify({
          message: "invalid credentials",
          status: 401
        }));
      });
    });
    it("should fail when password differs", async () => {
      const user = new _user.UserBuilder(true).build();

      _singleton.prismaMock.user.findUnique.mockResolvedValue(user);

      await _user2.UserService.login({
        email: user.email,
        password: "test-false"
      }).catch(error => {
        expect(error.message).toEqual(JSON.stringify({
          message: "invalid credentials",
          status: 401
        }));
      });
    });
    it("should fail when status is false", async () => {
      const user = new _user.UserBuilder(true).build();

      _singleton.prismaMock.user.findUnique.mockResolvedValue({ ...user,
        status: false
      });

      await _user2.UserService.login({
        email: user.email,
        password: "test-true"
      }).catch(error => {
        expect(error.message).toEqual(JSON.stringify({
          message: "User disabled, contact your administrator",
          status: 401
        }));
      });
    });
    it("should log the user", async () => {
      const user = new _user.UserBuilder(true).build();

      _singleton.prismaMock.user.findUnique.mockResolvedValue(user);

      const thisTest = await _user2.UserService.login({
        email: user.email,
        password: "test-true"
      });
      expect(thisTest).not.toBeUndefined();
      expect(thisTest).toEqual(expect.objectContaining({
        token: expect.any(String),
        user: expect.any(Object)
      }));
    });
  });
});