import { Parser } from "json2csv";

export class DataConverter {
	public static converterJSONToCSV(csvJSON: any[]): string {
		const parser = new Parser();
		const csv = parser.parse(csvJSON);

		return csv;
	}

	public static converterCSVToJSON(csvString: string): any {
		const CSVToJSON: any[] = [];

		const lines = DataConverter.converterStringToArray(
			csvString,
			"\n",
			"value",
		);
		const headers = DataConverter.converterStringToArray(lines[0], ",", "key");

		lines.map((l) => {
			const obj: Record<string, unknown> = {};
			const line = l.split(",");

			headers.map((key, index) => {
				obj[DataConverter.normalizeString(key)] = line[index];
			});

			CSVToJSON.push(obj);
		});

		return Object.values(CSVToJSON);
	}

	public static normalizeString(str: string): string {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	}

	public static sanitizeString(str: string, attribute: string): string {
		str = str
			.toString()
			.replace(/"/g, "")
			.replace(/'/g, "")
			.replace(/\//g, "")
			.trim();

		return attribute === "key" ? str.replace(/ /g, "").toLowerCase() : str;
	}

	public static converterStringToArray(
		str: string,
		term: string | RegExp,
		attribute: string,
	): any[] {
		return str
			.split(term)
			.map((arr) => DataConverter.sanitizeString(arr, attribute))
			.filter(Boolean);
	}
}
