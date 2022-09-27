import { DataConverter } from "../../../helpers/dataConverter";
import {
	CSVFileBuilder,
	CustomerBuilder,
} from "../../../shared/builder/csv.builder";
import { UserBuilder } from "../../../shared/builder/user.builder";
import { prismaMock } from "../../../singleton";
import { CSVService } from "../csv.service";

describe("CSVService", () => {
	describe("findMany", () => {
		it("should fail when not returning customers", async () => {
			const { id } = new UserBuilder().build();

			prismaMock.customer.findMany.mockRejectedValue({
				message: "failed to return customers",
			});

			await CSVService.findMany(id).catch((error) => {
				expect(error.message).toEqual(
					JSON.stringify({
						message: "failed to return customers",
						status: 400,
					}),
				);
			});
		});

		it("should find many customers", async () => {
			const { id } = new UserBuilder().build();

			const customers = Array(5)
				.fill({})
				.map(() => new CustomerBuilder().build());

			prismaMock.customer.findMany.mockResolvedValue(customers);

			const sut = await CSVService.findMany(id);

			expect(sut).toMatchObject(customers);
		});
	});

	describe("upload", () => {
		it("should fail when unable to add customers to database", async () => {
			const { id } = new UserBuilder().build();
			const csvFileBuilder = Array(5)
				.fill({})
				.map(() => new CSVFileBuilder().build());

			const csv = DataConverter.converterJSONToCSV(csvFileBuilder);
			const buffer = Buffer.from(csv, "utf8");

			prismaMock.customer.upsert.mockRejectedValue({
				message: "failed to upsert customers",
			});

			await CSVService.upload(buffer, id).catch((error) => {
				expect(error.message).toEqual(
					JSON.stringify({
						message: "failed to upsert customers",
						status: 400,
					}),
				);
			});
		});

		it("should handle csv and upload customer list", async () => {
			const { id } = new UserBuilder().build();
			const customers = new CustomerBuilder().build();
			const csvFileBuilder = Array(5)
				.fill({})
				.map(() => new CSVFileBuilder().build());

			const csv = DataConverter.converterJSONToCSV(csvFileBuilder);
			const buffer = Buffer.from(csv, "utf8");

			prismaMock.customer.upsert.mockResolvedValue(customers);

			const sut = await CSVService.upload(buffer, id);

			expect(sut).toBeUndefined();
		});
	});
});
