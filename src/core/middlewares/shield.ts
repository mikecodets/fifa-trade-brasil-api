import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import prisma from "../../client";
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

	public static async validateToken(request: Request, response: Response) {
		const { token } = request.params;

		if (!token) {
			return response.status(400).json({ message: "Token not found" });
		}

		try {
			const decode = verify(token, JWT_SECRET);
			const { userId } = decode as {
				userId: string;
			};

			const isUser = await prisma.user.findUnique({
				where: {
					id: userId,
				},
			});

			if (!isUser) {
				return response.status(401).json({
					error: "Authentication Failed",
					status: false,
				});
			}

			if (decode) {
				return response.status(200).json({
					message: "🎉 user authenticated",
					status: true,
				});
			}
		} catch (error) {
			return response.status(401).json({
				error: "Authentication Failed",
				status: false,
			});
		}
	}
}
