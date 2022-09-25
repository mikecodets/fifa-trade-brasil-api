import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import { hashSync } from "bcrypt";
import { BCRYPT_SALT } from "../../config";

export class UserBuilder {
	private id: string;
	private name: string;
	private email: string;
	private password: string;
	private acceptTermsAndConditions: boolean;
	private createdAt: Date;
	private updatedAt: Date;

	constructor(hash?: boolean) {
		const password = hash
			? hashSync("test-true", BCRYPT_SALT)
			: faker.internet.password();

		this.id = faker.database.mongodbObjectId();
		this.name = faker.name.fullName();
		this.email = faker.internet.email();
		this.password = password;
		this.acceptTermsAndConditions = true;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	public build(): User {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			password: this.password,
			acceptTermsAndConditions: this.acceptTermsAndConditions,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}
