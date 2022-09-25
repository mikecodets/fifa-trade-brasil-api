"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _morgan = _interopRequireDefault(require("morgan"));

var _path = _interopRequireDefault(require("path"));

var _config = require("./config");

var _httpErrorHandler = require("./core/errors/httpErrorHandler");

var _routes = require("./core/routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App {
  constructor() {
    this.app = (0, _express.default)();
    this.port = _config.PORT;
    this.routes = new _routes.Routes();
    this.app.use((_request, response, next) => {
      response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
      response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
      (0, _cors.default)();
      next();
    });
    this.app.use((0, _morgan.default)("dev"));
    this.app.use(_express.default.static(_path.default.join(__dirname, "..", "..", "..", "docs")));
    this.app.use(_express.default.json({
      limit: "1mb"
    }));
    this.app.use(_express.default.urlencoded({
      extended: true
    }));
    this.app.use("/v1", this.routes.firstVersion);
    this.app.use((error, _request, response, _next) => {
      if (error instanceof Error) {
        const {
          message,
          status
        } = _httpErrorHandler.HttpErrorHandler.errorParser(error);

        return response.status(status).json({
          error: message
        });
      }

      return response.json({
        error: "Error interno no servidor"
      });
    });
    this.app.listen(this.port, () => console.info(`🎉 API is running on port ${this.port}`));
  }

}

exports.App = App;
new App();