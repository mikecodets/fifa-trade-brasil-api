"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prismaMock = void 0;

var _jestMockExtended = require("jest-mock-extended");

var _client = _interopRequireDefault(require("./client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock("./client", () => ({
  __esModule: true,
  default: (0, _jestMockExtended.mockDeep)()
}));
beforeEach(() => {
  (0, _jestMockExtended.mockReset)(prismaMock);
});
const prismaMock = _client.default;
exports.prismaMock = prismaMock;