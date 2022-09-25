"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SupporterBuilder = exports.PaymentBuilder = exports.CustomerBuilder = exports.CSVFileBuilder = exports.AddressBuilder = void 0;

var _faker = require("@faker-js/faker");

class CSVFileBuilder {
  constructor() {
    this.id = _faker.faker.database.mongodbObjectId();
    this.apoiador = _faker.faker.database.mongodbObjectId();
    this.cpfcnpj = _faker.faker.phone.number("###.###.###-##");
    this.email = _faker.faker.internet.email();
    this.telefone = _faker.faker.phone.number("+## #####-####");
    this.valor = String(_faker.faker.datatype.float({
      min: 5,
      max: 50
    }));
    this.faixaderecompensa = _faker.faker.lorem.word();
    this.competenciadoapoio = _faker.faker.lorem.word();
    this.status = _faker.faker.helpers.arrayElement(["Pago", "Pendente"]);
    this.descricaodostatus = _faker.faker.lorem.word();
    this.metododepagamento = _faker.faker.helpers.arrayElement(["Cartão de crédito", "Cartão de débito", "PIX", "Boleto"]);
    this.cep = _faker.faker.address.zipCode();
    this.rua = _faker.faker.address.street();
    this.numero = String(_faker.faker.datatype.float({
      min: 1,
      max: 500
    }));
    this.complementos = _faker.faker.lorem.paragraph();
    this.bairro = _faker.faker.lorem.word();
    this.cidade = _faker.faker.address.city();
    this.uf = _faker.faker.address.countryCode();
    this.pais = _faker.faker.address.country();
    this.enderecocompleto = _faker.faker.lorem.paragraph();
  }

  build() {
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
      enderecocompleto: this.enderecocompleto
    };
  }

}

exports.CSVFileBuilder = CSVFileBuilder;

class CustomerBuilder {
  constructor() {
    this.id = _faker.faker.database.mongodbObjectId();
    this.apoiaseID = _faker.faker.database.mongodbObjectId();
    this.shipping = Date.now();
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.supporterId = _faker.faker.database.mongodbObjectId();
    this.paymentId = _faker.faker.database.mongodbObjectId();
    this.addressId = _faker.faker.database.mongodbObjectId();
    this.userId = _faker.faker.database.mongodbObjectId();
  }

  build() {
    return {
      id: this.id,
      apoiaseID: this.apoiaseID,
      shipping: this.shipping,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      supporterId: this.supporterId,
      paymentId: this.paymentId,
      addressId: this.addressId,
      userId: this.userId
    };
  }

}

exports.CustomerBuilder = CustomerBuilder;

class AddressBuilder {
  constructor() {
    this.id = _faker.faker.database.mongodbObjectId();
    this.zipCode = _faker.faker.address.zipCode();
    this.street = _faker.faker.address.street();
    this.numberOfHouse = String(_faker.faker.datatype.float({
      min: 1,
      max: 500
    }));
    this.complement = _faker.faker.lorem.paragraph();
    this.neighborhood = _faker.faker.lorem.word();
    this.city = _faker.faker.address.city();
    this.state = _faker.faker.address.countryCode();
    this.country = _faker.faker.address.country();
    this.fullAddress = _faker.faker.lorem.paragraph();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  build() {
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
      updatedAt: this.updatedAt
    };
  }

}

exports.AddressBuilder = AddressBuilder;

class PaymentBuilder {
  constructor() {
    this.id = "";
    this.amount = _faker.faker.datatype.float({
      min: 5,
      max: 50
    });
    this.rewardTrack = _faker.faker.lorem.word();
    this.supportCompetence = _faker.faker.lorem.word();
    this.statusPayment = _faker.faker.helpers.arrayElement(["Pago", "Pendente"]);
    this.statusDescription = _faker.faker.lorem.word();
    this.paymentMethod = _faker.faker.helpers.arrayElement(["Cartão de crédito", "Cartão de débito", "PIX", "Boleto"]);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  build() {
    return {
      id: this.id,
      amount: this.amount,
      rewardTrack: this.rewardTrack,
      supportCompetence: this.supportCompetence,
      statusPayment: this.statusPayment,
      statusDescription: this.statusDescription,
      paymentMethod: this.paymentMethod,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

}

exports.PaymentBuilder = PaymentBuilder;

class SupporterBuilder {
  constructor() {
    this.id = _faker.faker.database.mongodbObjectId();
    this.name = _faker.faker.database.mongodbObjectId();
    this.cpfOrCnpj = _faker.faker.phone.number("###.###.###-##");
    this.email = _faker.faker.internet.email();
    this.telephone = _faker.faker.phone.number("+## #####-####");
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  build() {
    return {
      id: this.id,
      name: this.name,
      cpfOrCnpj: this.cpfOrCnpj,
      email: this.email,
      telephone: this.telephone,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

}

exports.SupporterBuilder = SupporterBuilder;