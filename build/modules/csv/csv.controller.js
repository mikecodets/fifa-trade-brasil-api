"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CSVController = void 0;

var _csv = require("./csv.service");

class CSVController {
  static async findMany(request, response) {
    const {
      take,
      skip
    } = request.query;
    const customers = await _csv.CSVService.findMany(Number(take), Number(skip));
    return response.status(200).json({
      message: "🎉 customers returned successfully",
      customers
    });
  }

  static async upload(request, response) {
    await _csv.CSVService.upload(request.file, request.userId);
    return response.status(200).json({
      message: "🎉 uploaded successfully"
    });
  }

}

exports.CSVController = CSVController;