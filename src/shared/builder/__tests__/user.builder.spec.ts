import { UserBuilder } from "../user.builder";

describe("UserBuilder", () => {
	describe("constructor", () => {
		it("should be generate a new instance of UserBuilder", () => {
			const userBuilder: UserBuilder = new UserBuilder();

			expect(userBuilder).toBeInstanceOf(UserBuilder);
		});
	});

	describe("build", () => {
		it("should generate builder", () => {
			const sut = new UserBuilder().build();

			expect(sut).not.toBeUndefined();
		});

		it("should generate a builder when it is passed arguments in its constructor", () => {
			const sut = new UserBuilder(true).build();

			expect(sut).not.toBeUndefined();
		});
	});
});
