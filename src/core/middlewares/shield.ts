import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET } from "../../config";
import { HttpErrorHandler } from "../errors/httpErrorHandler";

export class Auth {
	public static async user(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		const authorization = request.get("authorization");

		if (!authorization) {
			return response.status(400).json({ message: "Token not found" });
		}

		const [, token] = authorization.split(" ");

		try {
			const decode: string | JwtPayload = JSON.stringify(
				verify(token, JWT_SECRET),
			);
			const subject = JSON.parse(decode);

			if (!decode) {
				throw new Error(
					HttpErrorHandler.targetError({
						message: "Unidentified decode",
						status: 400,
					}),
				);
			}

			request.userId = subject.userId;

			return next();
		} catch (error) {
			return response.status(401).json({
				error: "Unauthorized token",
			});
		}
	}
}
