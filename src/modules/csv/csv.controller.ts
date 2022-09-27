import { Customer } from "@prisma/client";
import { Request, Response } from "express";
import { CSVService } from "./csv.service";

export class CSVController {
	public static async findMany(
		request: Request,
		response: Response,
	): Promise<Response<Customer[]>> {
		const customers = await CSVService.findMany();

		return response.status(200).json({
			message: "🎉 Customers returned successfully",
			customers,
		});
	}

	public static async upload(
		request: Request,
		response: Response,
	): Promise<Response<void>> {
		await CSVService.upload(request.file, request.userId);

		return response.status(200).json({
			message: "🎉 Uploaded successfully",
		});
	}
}
