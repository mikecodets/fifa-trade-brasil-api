import { User } from "@prisma/client";

export type UserLoginRequest = {
	email: string;
	password: string;
};

export type UserLoginResponse = {
	token: string;
	user: User;
};
