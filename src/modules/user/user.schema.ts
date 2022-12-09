import * as yup from "yup";
import { Exception } from "../../core/error/exception";
import { UserLoginRequest } from "./user.type";

export class UserSchema {
	public static async validate(user: UserLoginRequest) {
		const schema = yup.object({
			email: yup
				.string()
				.required("The email is a required")
				.email("Email must be valid"),
			password: yup
				.string()
				.required("The password is a required")
				.min(8, "Password must be at least 8 characters long")
				.max(16, "Password must be a maximum of 16 characters"),
		});

		return schema.validate(user).catch((error) => {
			throw new Exception(error.message, 401);
		});
	}
}
