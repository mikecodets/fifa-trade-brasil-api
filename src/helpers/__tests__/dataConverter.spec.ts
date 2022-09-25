import { CustomerBuilder } from "../../shared/builder/csv.builder";
import { DataConverter } from "../dataConverter";

describe("DataConverter", () => {
	describe("converterJSONToCSV", () => {
		it("should convert json data type to csv", () => {
			const customers = Array(5)
				.fill({})
				.map(() => new CustomerBuilder().build());

			const sut = DataConverter.converterJSONToCSV(customers);

			expect(sut).toEqual(expect.any(String));
		});
	});

	describe("converterCSVToJSON", () => {
		it("should convert csv data type to json", () => {
			const customers = Array(5)
				.fill({})
				.map(() => new CustomerBuilder().build());

			const csvString = DataConverter.converterJSONToCSV(customers);
			const sut = DataConverter.converterCSVToJSON(csvString);

			expect(sut).toEqual(expect.any(Object));
		});
	});

	describe("normalizeString", () => {
		it("should normalize string", () => {
			const sut = DataConverter.normalizeString(
				"ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïòóôõöùúûüýÿ",
			);

			expect(sut).toEqual(
				"AAAAAACEEEEIIIIOOOOOUUUUYaaaaaaceeeeiiiiooooouuuuyy",
			);
		});
	});

	describe("sanitizeString", () => {
		it("must clear the string when there is no key attribute", async () => {
			const sut = DataConverter.sanitizeString(" ca\"cho'/rro", "value");

			expect(sut).toEqual("cachorro");
		});

		it("must clear the string when there is the key attribute", async () => {
			const sut = DataConverter.sanitizeString(" ca\"c ho'/rro", "key");

			expect(sut).toEqual("cachorro");
		});
	});

	describe("converterStringToArray", () => {
		it("should converter string to array", () => {
			const str = "1\n2\n3\n \n";

			const sut = DataConverter.converterStringToArray(str, "\n", "value");

			expect(sut).toEqual(["1", "2", "3"]);
		});
	});
});
