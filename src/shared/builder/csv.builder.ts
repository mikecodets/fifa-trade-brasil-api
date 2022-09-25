import { faker } from "@faker-js/faker";
import { Address, Customer, Payment, Supporter } from "@prisma/client";
import { ICSVFile } from "../../modules/csv/csv.interface";

export class CSVFileBuilder {
	private id: string;
	private apoiador: string;
	private cpfcnpj: string;
	private email: string;
	private telefone: string;
	private valor: string;
	private faixaderecompensa: string;
	private competenciadoapoio: string;
	private status: string;
	private descricaodostatus: string;
	private metododepagamento: string;
	private cep: string;
	private rua: string;
	private numero: string;
	private complementos: string;
	private bairro: string;
	private cidade: string;
	private uf: string;
	private pais: string;
	private enderecocompleto: string;

	constructor() {
		this.id = faker.database.mongodbObjectId();
		this.apoiador = faker.database.mongodbObjectId();
		this.cpfcnpj = faker.phone.number("###.###.###-##");
		this.email = faker.internet.email();
		this.telefone = faker.phone.number("+## #####-####");
		this.valor = String(faker.datatype.float({ min: 5, max: 50 }));
		this.faixaderecompensa = faker.lorem.word();
		this.competenciadoapoio = faker.lorem.word();
		this.status = faker.helpers.arrayElement(["Pago", "Pendente"]);
		this.descricaodostatus = faker.lorem.word();
		this.metododepagamento = faker.helpers.arrayElement([
			"Cartão de crédito",
			"Cartão de débito",
			"PIX",
			"Boleto",
		]);
		this.cep = faker.address.zipCode();
		this.rua = faker.address.street();
		this.numero = String(faker.datatype.float({ min: 1, max: 500 }));
		this.complementos = faker.lorem.paragraph();
		this.bairro = faker.lorem.word();
		this.cidade = faker.address.city();
		this.uf = faker.address.countryCode();
		this.pais = faker.address.country();
		this.enderecocompleto = faker.lorem.paragraph();
	}

	public build(): ICSVFile {
		return {
			id: this.id,
			apoiador: this.apoiador,
			cpfcnpj: this.cpfcnpj,
			email: this.email,
			telefone: this.telefone,
			valor: this.valor,
			faixaderecompensa: this.faixaderecompensa,
			competenciadoapoio: this.competenciadoapoio,
			status: this.status,
			descricaodostatus: this.descricaodostatus,
			metododepagamento: this.metododepagamento,
			cep: this.cep,
			rua: this.rua,
			numero: this.numero,
			complementos: this.complementos,
			bairro: this.bairro,
			cidade: this.cidade,
			uf: this.uf,
			pais: this.pais,
			enderecocompleto: this.enderecocompleto,
		};
	}
}

export class CustomerBuilder {
	private id: string;
	private apoiaseID: string;
	private shipping: number;
	private createdAt: Date;
	private updatedAt: Date;
	private supporterId: string;
	private paymentId: string;
	private addressId: string;
	private userId: string;

	constructor() {
		this.id = faker.database.mongodbObjectId();
		this.apoiaseID = faker.database.mongodbObjectId();
		this.shipping = Date.now();
		this.createdAt = new Date();
		this.updatedAt = new Date();
		this.supporterId = faker.database.mongodbObjectId();
		this.paymentId = faker.database.mongodbObjectId();
		this.addressId = faker.database.mongodbObjectId();
		this.userId = faker.database.mongodbObjectId();
	}

	public build(): Customer {
		return {
			id: this.id,
			apoiaseID: this.apoiaseID,
			shipping: this.shipping,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			supporterId: this.supporterId,
			paymentId: this.paymentId,
			addressId: this.addressId,
			userId: this.userId,
		};
	}
}

export class AddressBuilder {
	private id: string;
	private zipCode: string;
	private street: string;
	private numberOfHouse: string;
	private complement: string;
	private neighborhood: string;
	private city: string;
	private state: string;
	private country: string;
	private fullAddress: string;
	private createdAt: Date;
	private updatedAt: Date;

	constructor() {
		this.id = faker.database.mongodbObjectId();
		this.zipCode = faker.address.zipCode();
		this.street = faker.address.street();
		this.numberOfHouse = String(faker.datatype.float({ min: 1, max: 500 }));
		this.complement = faker.lorem.paragraph();
		this.neighborhood = faker.lorem.word();
		this.city = faker.address.city();
		this.state = faker.address.countryCode();
		this.country = faker.address.country();
		this.fullAddress = faker.lorem.paragraph();
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	public build(): Address {
		return {
			id: this.id,
			zipCode: this.zipCode,
			street: this.street,
			numberOfHouse: this.numberOfHouse,
			complement: this.complement,
			neighborhood: this.neighborhood,
			city: this.city,
			state: this.state,
			country: this.country,
			fullAddress: this.fullAddress,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}

export class PaymentBuilder {
	private id: string;
	private amount: number;
	private rewardTrack: string;
	private supportCompetence: string;
	private statusPayment: string;
	private statusDescription: string;
	private paymentMethod: string;
	private createdAt: Date;
	private updatedAt: Date;

	constructor() {
		this.id = "";
		this.amount = faker.datatype.float({ min: 5, max: 50 });
		this.rewardTrack = faker.lorem.word();
		this.supportCompetence = faker.lorem.word();
		this.statusPayment = faker.helpers.arrayElement(["Pago", "Pendente"]);
		this.statusDescription = faker.lorem.word();
		this.paymentMethod = faker.helpers.arrayElement([
			"Cartão de crédito",
			"Cartão de débito",
			"PIX",
			"Boleto",
		]);
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	public build(): Payment {
		return {
			id: this.id,
			amount: this.amount,
			rewardTrack: this.rewardTrack,
			supportCompetence: this.supportCompetence,
			statusPayment: this.statusPayment,
			statusDescription: this.statusDescription,
			paymentMethod: this.paymentMethod,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}

export class SupporterBuilder {
	private id: string;
	private name: string;
	private cpfOrCnpj: string;
	private email: string;
	private telephone: string;
	private createdAt: Date;
	private updatedAt: Date;

	constructor() {
		this.id = faker.database.mongodbObjectId();
		this.name = faker.database.mongodbObjectId();
		this.cpfOrCnpj = faker.phone.number("###.###.###-##");
		this.email = faker.internet.email();
		this.telephone = faker.phone.number("+## #####-####");
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	public build(): Supporter {
		return {
			id: this.id,
			name: this.name,
			cpfOrCnpj: this.cpfOrCnpj,
			email: this.email,
			telephone: this.telephone,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}
