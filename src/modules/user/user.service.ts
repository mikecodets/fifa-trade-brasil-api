import { User } from "@prisma/client";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import prisma from "../../client";
import { BCRYPT_SALT, JWT_SECRET } from "../../config";
import { HttpErrorHandler } from "../../core/errors/httpErrorHandler";
import { UserLoginRequest, UserLoginResponse } from "./user.interface";
import { UserSchema } from "./user.schema";

export class UserService {
	public static async create(user: User): Promise<User> {
		if (!user.acceptTermsAndConditions) {
			throw new Error(
				HttpErrorHandler.targetError({
					message: "User must accept terms",
					status: 401,
				}),
			);
		}

		await UserSchema.validate(user);

		const isUser = await prisma.user.findUnique({
			where: {
				email: user.email,
			},
		});

		if (isUser) {
			throw new Error(
				HttpErrorHandler.targetError({
					message: "User already exists",
					status: 401,
				}),
			);
		}

		const salt = genSaltSync(BCRYPT_SALT);
		user.password = hashSync(user.password, salt);

		return await prisma.user
			.create({
				data: user,
			})
			.catch((error) => {
				throw new Error(
					HttpErrorHandler.targetError({
						message: error.message,
						status: 400,
					}),
				);
			});
	}

	public static async findMany(): Promise<User[]> {
		return await prisma.user.findMany().catch((error) => {
			throw new Error(
				HttpErrorHandler.targetError({
					message: error.message,
					status: 400,
				}),
			);
		});
	}

	public static async login(
		user: UserLoginRequest,
	): Promise<UserLoginResponse> {
		await UserSchema.validate(user);

		const isUser = await prisma.user
			.findUnique({
				where: {
					email: user.email,
				},
			})
			.catch((error) => {
				throw new Error(
					HttpErrorHandler.targetError({
						message: error.message,
						status: 400,
					}),
				);
			});

		if (!isUser) {
			throw new Error(
				HttpErrorHandler.targetError({
					message: "invalid credentials",
					status: 401,
				}),
			);
		}

		const compare = compareSync(user.password, isUser.password);

		if (!compare) {
			throw new Error(
				HttpErrorHandler.targetError({
					message: "invalid credentials",
					status: 401,
				}),
			);
		}

		if (!isUser.status) {
			throw new Error(
				HttpErrorHandler.targetError({
					message: "User disabled, contact your administrator",
					status: 401,
				}),
			);
		}

		const token = sign(
			{
				userId: isUser.id,
			},
			JWT_SECRET,
			{ expiresIn: 60 * 60 },
		);

		return {
			token,
			user: isUser,
		};
	}
}
