export class Exception extends Error {
	public status: number;
	public name: string;

	constructor(message: string, status: number) {
		super();

		this.message = message;
		this.status = status;
		this.name = this.constructor.name;
	}
}
