import { Exception } from "../exception";

describe("constructor", () => {
	it("should be generate a new instance of CustomerBuilder", () => {
		const customerBuilder: Exception = new Exception("I am a mistake", 404);

		expect(customerBuilder).toBeInstanceOf(Exception);
		expect(customerBuilder).not.toBeUndefined();
		expect(customerBuilder.message).toEqual("I am a mistake");
		expect(customerBuilder.status).toEqual(404);
	});
});
