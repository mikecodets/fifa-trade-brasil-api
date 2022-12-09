import { User } from "@prisma/client";
import { Request, Response } from "express";
import { UserService } from "./user.service";
import { UserLoginResponse } from "./user.type";

export class UserController {
	public static async create(
		request: Request,
		response: Response,
	): Promise<Response<User>> {
		const user = await UserService.create(request.body);

		return response.status(201).json({
			message: "🎉 User created successfully",
			user,
		});
	}

	public static async findMany(
		_: Request,
		response: Response,
	): Promise<Response<User>> {
		const users = await UserService.findMany();

		return response.status(200).json({
			message: "🎉 Users returned successfully",
			users,
		});
	}

	public static async login(
		request: Request,
		response: Response,
	): Promise<Response<UserLoginResponse>> {
		const { user, token } = await UserService.login(request.body);

		return response.status(200).json({
			message: "🎉 User logged successfully",
			user,
			token,
		});
	}
}
