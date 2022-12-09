import { User } from "@prisma/client";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import prisma from "../../client";
import { BCRYPT_SALT, JWT_SECRET } from "../../config";
import { Exception } from "../../core/error/exception";
import { UserSchema } from "./user.schema";
import { UserLoginRequest, UserLoginResponse } from "./user.type";

export class UserService {
	public static create: (user: User) => Promise<User> = async (
		user: User,
	): Promise<User> => {
		if (!user.acceptTermsAndConditions) {
			throw new Exception("User must accept terms", 401);
		}

		await UserSchema.validate(user);

		const isUser = await prisma.user.findUnique({
			where: {
				email: user.email,
			},
		});

		if (isUser) {
			throw new Exception("User already exists", 401);
		}

		const salt = genSaltSync(BCRYPT_SALT);
		user.password = hashSync(user.password, salt);

		return await prisma.user
			.create({
				data: user,
			})
			.catch((error) => {
				throw new Exception(error.message, 400);
			});
	};

	public static async findMany(): Promise<User[]> {
		return await prisma.user.findMany().catch((error) => {
			throw new Exception(error.message, 400);
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
				throw new Exception(error.message, 400);
			});

		if (!isUser) {
			throw new Exception("invalid credentials", 401);
		}

		const compare = compareSync(user.password, isUser.password);

		if (!compare) {
			throw new Exception("invalid credentials", 401);
		}

		if (!isUser.status) {
			throw new Exception("User disabled, contact your administrator", 401);
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
