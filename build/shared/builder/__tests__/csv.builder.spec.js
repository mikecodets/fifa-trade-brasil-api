"use strict";

var _csv = require("../csv.builder");

describe("CustomerBuilder", () => {
  describe("constructor", () => {
    it("should be generate a new instance of CustomerBuilder", () => {
      const customerBuilder = new _csv.CustomerBuilder();
      expect(customerBuilder).toBeInstanceOf(_csv.CustomerBuilder);
    });
  });
  describe("builder", () => {
    it("should generate builder", () => {
      const sut = new _csv.CustomerBuilder().build();
      expect(sut).not.toBeUndefined();
    });
  });
});
describe("AddressBuilder", () => {
  describe("constructor", () => {
    it("should be generate a new instance of AddressBuilder", () => {
      const addressBuilder = new _csv.AddressBuilder();
      expect(addressBuilder).toBeInstanceOf(_csv.AddressBuilder);
    });
  });
  describe("builder", () => {
    it("should generate builder", () => {
      const sut = new _csv.AddressBuilder().build();
      expect(sut).not.toBeUndefined();
    });
  });
});
describe("PaymentBuilder", () => {
  describe("constructor", () => {
    it("should be generate a new instance of PaymentBuilder", () => {
      const paymentBuilder = new _csv.PaymentBuilder();
      expect(paymentBuilder).toBeInstanceOf(_csv.PaymentBuilder);
    });
  });
  describe("builder", () => {
    it("should generate builder", () => {
      const sut = new _csv.PaymentBuilder().build();
      expect(sut).not.toBeUndefined();
    });
  });
});
describe("SupporterBuilder", () => {
  describe("constructor", () => {
    it("should be generate a new instance of SupporterBuilder", () => {
      const supporterBuilder = new _csv.SupporterBuilder();
      expect(supporterBuilder).toBeInstanceOf(_csv.SupporterBuilder);
    });
  });
  describe("builder", () => {
    it("should generate builder", () => {
      const sut = new _csv.SupporterBuilder().build();
      expect(sut).not.toBeUndefined();
    });
  });
});