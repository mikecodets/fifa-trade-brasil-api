import { User } from "@prisma/client";
import { Request, Response } from "express";
import { UserLoginResponse } from "./user.interface";
import { UserService } from "./user.service";

export class UserController {
	public static async create(
		request: Request,
		response: Response,
	): Promise<Response<User>> {
		const user = await UserService.create(request.body);

		return response.status(201).json({
			message: "🎉 user created successfully",
			user,
		});
	}

	public static async findMany(
		request: Request,
		response: Response,
	): Promise<Response<User>> {
		const users = await UserService.findMany();

		return response.status(200).json({
			message: "🎉 users returned successfully",
			users,
		});
	}

	public static async login(
		request: Request,
		response: Response,
	): Promise<Response<UserLoginResponse>> {
		const { user, token } = await UserService.login(request.body);

		return response.status(200).json({
			message: "🎉 user logged successfully",
			user,
			token,
		});
	}
}
