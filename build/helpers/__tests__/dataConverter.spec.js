"use strict";

var _csv = require("../../shared/builder/csv.builder");

var _dataConverter = require("../dataConverter");

describe("DataConverter", () => {
  describe("converterJSONToCSV", () => {
    it("should convert json data type to csv", () => {
      const customers = Array(5).fill({}).map(() => new _csv.CustomerBuilder().build());

      const sut = _dataConverter.DataConverter.converterJSONToCSV(customers);

      expect(sut).toEqual(expect.any(String));
    });
  });
  describe("converterCSVToJSON", () => {
    it("should convert csv data type to json", () => {
      const customers = Array(5).fill({}).map(() => new _csv.CustomerBuilder().build());

      const csvString = _dataConverter.DataConverter.converterJSONToCSV(customers);

      const sut = _dataConverter.DataConverter.converterCSVToJSON(csvString);

      expect(sut).toEqual(expect.any(Object));
    });
  });
  describe("normalizeString", () => {
    it("should normalize string", () => {
      const sut = _dataConverter.DataConverter.normalizeString("ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïòóôõöùúûüýÿ");

      expect(sut).toEqual("AAAAAACEEEEIIIIOOOOOUUUUYaaaaaaceeeeiiiiooooouuuuyy");
    });
  });
  describe("sanitizeString", () => {
    it("must clear the string when there is no key attribute", async () => {
      const sut = _dataConverter.DataConverter.sanitizeString(" ca\"cho'/rro", "value");

      expect(sut).toEqual("cachorro");
    });
    it("must clear the string when there is the key attribute", async () => {
      const sut = _dataConverter.DataConverter.sanitizeString(" ca\"c ho'/rro", "key");

      expect(sut).toEqual("cachorro");
    });
  });
  describe("converterStringToArray", () => {
    it("should converter string to array", () => {
      const str = "1\n2\n3\n \n";

      const sut = _dataConverter.DataConverter.converterStringToArray(str, "\n", "value");

      expect(sut).toEqual(["1", "2", "3"]);
    });
  });
});