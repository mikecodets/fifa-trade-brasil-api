"use strict";

var _dataConverter = require("../../../helpers/dataConverter");

var _csv = require("../../../shared/builder/csv.builder");

var _user = require("../../../shared/builder/user.builder");

var _singleton = require("../../../singleton");

var _csv2 = require("../csv.service");

describe("CSVService", () => {
  describe("findMany", () => {
    it("should fail when not returning customers", async () => {
      _singleton.prismaMock.customer.findMany.mockRejectedValue({
        message: "failed to return customers"
      });

      await _csv2.CSVService.findMany().catch(error => {
        expect(error.message).toEqual(JSON.stringify({
          message: "failed to return customers",
          status: 400
        }));
      });
    });
    it("should support pagination", async () => {
      const customers = Array(5).fill({}).map(() => new _csv.CustomerBuilder().build());

      _singleton.prismaMock.customer.findMany.mockResolvedValue(customers);

      const sut = await _csv2.CSVService.findMany(5, 5);
      expect(sut).toHaveLength(customers.length);
    });
    it("should find many customers", async () => {
      const customers = Array(5).fill({}).map(() => new _csv.CustomerBuilder().build());

      _singleton.prismaMock.customer.findMany.mockResolvedValue(customers);

      const sut = await _csv2.CSVService.findMany();
      expect(sut).toMatchObject(customers);
    });
  });
  describe("upload", () => {
    it("should fail when unable to add customers to database", async () => {
      const {
        id
      } = new _user.UserBuilder().build();
      const csvFileBuilder = Array(5).fill({}).map(() => new _csv.CSVFileBuilder().build());

      const csv = _dataConverter.DataConverter.converterJSONToCSV(csvFileBuilder);

      const buffer = Buffer.from(csv, "utf8");

      _singleton.prismaMock.customer.upsert.mockRejectedValue({
        message: "failed to upsert customers"
      });

      await _csv2.CSVService.upload(buffer, id).catch(error => {
        expect(error.message).toEqual(JSON.stringify({
          message: "failed to upsert customers",
          status: 400
        }));
      });
    });
    it("should handle csv and upload customer list", async () => {
      const {
        id
      } = new _user.UserBuilder().build();
      const customers = new _csv.CustomerBuilder().build();
      const csvFileBuilder = Array(5).fill({}).map(() => new _csv.CSVFileBuilder().build());

      const csv = _dataConverter.DataConverter.converterJSONToCSV(csvFileBuilder);

      const buffer = Buffer.from(csv, "utf8");

      _singleton.prismaMock.customer.upsert.mockResolvedValue(customers);

      const sut = await _csv2.CSVService.upload(buffer, id);
      expect(sut).toBeUndefined();
    });
  });
});