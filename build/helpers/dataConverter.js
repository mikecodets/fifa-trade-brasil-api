"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataConverter = void 0;

var _json2csv = require("json2csv");

class DataConverter {
  static converterJSONToCSV(csvJSON) {
    const parser = new _json2csv.Parser();
    const csv = parser.parse(csvJSON);
    return csv;
  }

  static converterCSVToJSON(csvString) {
    const CSVToJSON = [];
    const lines = DataConverter.converterStringToArray(csvString, "\n", "value");
    const headers = DataConverter.converterStringToArray(lines[0], ",", "key");
    lines.map(l => {
      const obj = {};
      const line = l.split(",");
      headers.map((key, index) => {
        obj[DataConverter.normalizeString(key)] = line[index];
      });
      CSVToJSON.push(obj);
    });
    return Object.values(CSVToJSON);
  }

  static normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  static sanitizeString(str, attribute) {
    const srtRgx = str.replaceAll("\"", "").replaceAll("'", "").replaceAll("/", "").trim();
    return attribute === "key" ? srtRgx.replaceAll(" ", "").toLowerCase() : srtRgx;
  }

  static converterStringToArray(str, term, attribute) {
    return str.split(term).map(arr => DataConverter.sanitizeString(arr, attribute)).filter(Boolean);
  }

}

exports.DataConverter = DataConverter;