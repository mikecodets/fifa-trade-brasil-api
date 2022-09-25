import { UserBuilder } from "../../../shared/builder/user.builder";
import { prismaMock } from "../../../singleton";
import { UserService } from "../user.service";

describe("UserService", () => {
	describe("create", () => {
		it("should fail when the user does not accept the terms and conditions of use", async () => {
			const user = new UserBuilder().build();

			await UserService.create({
				...user,
				acceptTermsAndConditions: false,
			}).catch((error) => {
				expect(error.message).toEqual(
					JSON.stringify({
						message: "User must accept terms",
						status: 401,
					}),
				);
			});
		});

		it("should fail when the user already exists", async () => {
			const user = new UserBuilder().build();

			prismaMock.user.findUnique.mockResolvedValue(user);

			await UserService.create(user).catch((error) => {
				expect(error.message).toEqual(
					JSON.stringify({
						message: "User already exists",
						status: 401,
					}),
				);
			});
		});

		it("should fail when unable to save user", async () => {
			const user = new UserBuilder().build();

			prismaMock.user.create.mockRejectedValue({
				message: "failed to save user",
			});

			await UserService.create(user).catch((error) => {
				expect(error.message).toEqual(
					JSON.stringify({
						message: "failed to save user",
						status: 400,
					}),
				);
			});
		});

		it("should create a new user", async () => {
			const user = new UserBuilder().build();

			prismaMock.user.create.mockResolvedValue(user);

			const sut = await UserService.create(user);

			expect(sut.id).toEqual(user.id);
			expect(sut.createdAt).toEqual(user.createdAt);
			expect(sut.updatedAt).toEqual(user.updatedAt);
		});
	});

	describe("find many", () => {
		it("should fail when not returning users", async () => {
			prismaMock.user.findMany.mockRejectedValue({
				message: "failed to return users",
			});

			await UserService.findMany().catch((error) => {
				expect(error.message).toEqual(
					JSON.stringify({
						message: "failed to return users",
						status: 400,
					}),
				);
			});
		});

		it("should find many users", async () => {
			const users = Array(5)
				.fill({})
				.map(() => new UserBuilder().build());

			prismaMock.user.findMany.mockResolvedValue(users);

			const sut = await UserService.findMany();

			expect(sut).toMatchObject(users);
		});
	});

	describe("login", () => {
		it("should fail when not returning a user", async () => {
			const { email, password } = new UserBuilder().build();

			prismaMock.user.findUnique.mockRejectedValue({
				message: "failed to return user",
			});

			await UserService.login({ email, password }).catch((error) => {
				expect(error.message).toEqual(
					JSON.stringify({
						message: "failed to return user",
						status: 400,
					}),
				);
			});
		});

		it("should fail when user does not exist", async () => {
			const { email, password } = new UserBuilder().build();

			prismaMock.user.findUnique.mockResolvedValue(null);

			await UserService.login({ email, password }).catch((error) => {
				expect(error.message).toEqual(
					JSON.stringify({
						message: "invalid credentials",
						status: 401,
					}),
				);
			});
		});

		it("should fail when password differs", async () => {
			const user = new UserBuilder(true).build();

			prismaMock.user.findUnique.mockResolvedValue(user);

			await UserService.login({
				email: user.email,
				password: "test-false",
			}).catch((error) => {
				expect(error.message).toEqual(
					JSON.stringify({
						message: "invalid credentials",
						status: 401,
					}),
				);
			});
		});

		it("should fail when status is false", async () => {
			const user = new UserBuilder(true).build();

			prismaMock.user.findUnique.mockResolvedValue({
				...user,
				status: false,
			});

			await UserService.login({
				email: user.email,
				password: "test-true",
			}).catch((error) => {
				expect(error.message).toEqual(
					JSON.stringify({
						message: "User disabled, contact your administrator",
						status: 401,
					}),
				);
			});
		});

		it("should log the user", async () => {
			const user = new UserBuilder(true).build();
			prismaMock.user.findUnique.mockResolvedValue(user);

			const thisTest = await UserService.login({
				email: user.email,
				password: "test-true",
			});

			expect(thisTest).not.toBeUndefined();
			expect(thisTest).toEqual(
				expect.objectContaining({
					token: expect.any(String),
					user: expect.any(Object),
				}),
			);
		});
	});
});
