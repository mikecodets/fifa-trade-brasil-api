import { UserBuilder } from "../../../shared/builder/user.builder";
import { UserSchema } from "../user.schema";

describe("UserSchema", () => {
	it("should fail when user does not provide an email", async () => {
		const user = new UserBuilder().build();

		await UserSchema.validate({
			...user,
			email: "",
		}).catch((error) => {
			expect(error.message).toEqual("The email is a required");
			expect(error.status).toEqual(401);
		});
	});

	it("should fail when the user does not provide a valid email address.", async () => {
		const user = new UserBuilder().build();

		await UserSchema.validate({
			...user,
			email: "invalid-mail",
		}).catch((error) => {
			expect(error.message).toEqual("Email must be valid");
			expect(error.status).toEqual(401);
		});
	});

	it("should fail when user does not provide an password", async () => {
		const user = new UserBuilder().build();

		await UserSchema.validate({
			...user,
			password: "",
		}).catch((error) => {
			expect(error.message).toEqual("The password is a required");
			expect(error.status).toEqual(401);
		});
	});

	it("should fail when password must be at least 8 characters long", async () => {
		const user = new UserBuilder().build();

		await UserSchema.validate({
			...user,
			password: "123456",
		}).catch((error) => {
			expect(error.message).toEqual(
				"Password must be at least 8 characters long",
			);
			expect(error.status).toEqual(401);
		});
	});

	it("should fail when password must be a maximum of 16 characters", async () => {
		const user = new UserBuilder().build();

		await UserSchema.validate({
			...user,
			password: "12345678910111213141516",
		}).catch((error) => {
			expect(error.message).toEqual(
				"Password must be a maximum of 16 characters",
			);
			expect(error.status).toEqual(401);
		});
	});
});
