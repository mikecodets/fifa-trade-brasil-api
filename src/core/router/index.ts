import { Router } from "express";
import multer from "multer";
import { CSVController } from "../../modules/csv/csv.controller";
import { UserController } from "../../modules/user/user.controller";
import { storage } from "../middleware/multer";
import { Auth } from "../middleware/shield";

export class Routes {
	public firstVersion: Router;

	constructor() {
		this.firstVersion = Router();

		this.firstVersion.get("/validate-token/:token", Auth.validateToken);

		this.firstVersion.post("/user", UserController.create);
		this.firstVersion.post("/user/login", UserController.login);
		this.firstVersion.get(
			"/user/find-many",
			Auth.user,
			UserController.findMany,
		);

		this.firstVersion.get("/csv/find-many", Auth.user, CSVController.findMany);
		this.firstVersion.post(
			"/csv/upload",
			multer({ storage }).single("csv"),
			Auth.user,
			CSVController.upload,
		);
	}
}
