import {
	AddressBuilder,
	CustomerBuilder,
	PaymentBuilder,
	SupporterBuilder,
} from "../csv.builder";

describe("CustomerBuilder", () => {
	describe("constructor", () => {
		it("should be generate a new instance of CustomerBuilder", () => {
			const customerBuilder: CustomerBuilder = new CustomerBuilder();

			expect(customerBuilder).toBeInstanceOf(CustomerBuilder);
		});
	});

	describe("builder", () => {
		it("should generate builder", () => {
			const sut = new CustomerBuilder().build();

			expect(sut).not.toBeUndefined();
		});
	});
});

describe("AddressBuilder", () => {
	describe("constructor", () => {
		it("should be generate a new instance of AddressBuilder", () => {
			const addressBuilder: AddressBuilder = new AddressBuilder();

			expect(addressBuilder).toBeInstanceOf(AddressBuilder);
		});
	});

	describe("builder", () => {
		it("should generate builder", () => {
			const sut = new AddressBuilder().build();

			expect(sut).not.toBeUndefined();
		});
	});
});

describe("PaymentBuilder", () => {
	describe("constructor", () => {
		it("should be generate a new instance of PaymentBuilder", () => {
			const paymentBuilder: PaymentBuilder = new PaymentBuilder();

			expect(paymentBuilder).toBeInstanceOf(PaymentBuilder);
		});
	});

	describe("builder", () => {
		it("should generate builder", () => {
			const sut = new PaymentBuilder().build();

			expect(sut).not.toBeUndefined();
		});
	});
});

describe("SupporterBuilder", () => {
	describe("constructor", () => {
		it("should be generate a new instance of SupporterBuilder", () => {
			const supporterBuilder: SupporterBuilder = new SupporterBuilder();

			expect(supporterBuilder).toBeInstanceOf(SupporterBuilder);
		});
	});

	describe("builder", () => {
		it("should generate builder", () => {
			const sut = new SupporterBuilder().build();

			expect(sut).not.toBeUndefined();
		});
	});
});
