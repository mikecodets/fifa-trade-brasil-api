"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CSVService = void 0;

var _client = _interopRequireDefault(require("../../client"));

var _httpErrorHandler = require("../../core/errors/httpErrorHandler");

var _dataConverter = require("../../helpers/dataConverter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CSVService {
  static async findMany(take, skip) {
    return await _client.default.customer.findMany({
      include: {
        supporter: true,
        address: true,
        payment: true
      },
      take: take ? take : 10,
      skip: skip ? skip : 0
    }).catch(err => {
      throw new Error(_httpErrorHandler.HttpErrorHandler.targetError({
        message: err.message,
        status: 400
      }));
    });
  }

  static async upload(csv, userId) {
    const data = Buffer.from(csv.buffer).toString();

    const csvConvertedToJson = _dataConverter.DataConverter.converterCSVToJSON(data);

    const shipping = Date.now();
    const [, ...customers] = csvConvertedToJson.map(value => ({
      apoiaseID: value.id,
      supporter: {
        name: value.apoiador,
        cpfOrCnpj: value.cpfcnpj,
        email: value.email,
        telephone: value.telefone
      },
      payment: {
        amount: parseFloat(value.valor),
        rewardTrack: value.faixaderecompensa,
        supportCompetence: value.competenciadoapoio,
        statusPayment: value.status,
        statusDescription: value.descricaodostatus,
        paymentMethod: value.metododepagamento
      },
      address: {
        zipCode: value.cep,
        street: value.rua,
        numberOfHouse: value.numero,
        complement: value.complementos,
        neighborhood: value.bairro,
        city: value.cidade,
        state: value.uf,
        country: value.pais,
        fullAddress: value.enderecocompleto
      },
      shipping
    }));
    const createManyCustomers = customers.map(async customer => {
      await _client.default.customer.upsert({
        where: {
          apoiaseID: customer.apoiaseID
        },
        update: {
          supporter: {
            update: {
              name: customer.supporter.name,
              cpfOrCnpj: customer.supporter.cpfOrCnpj,
              email: customer.supporter.email,
              telephone: customer.supporter.telephone
            }
          },
          payment: {
            update: {
              amount: customer.payment.amount,
              rewardTrack: customer.payment.rewardTrack,
              supportCompetence: customer.payment.supportCompetence,
              statusPayment: customer.payment.statusPayment,
              statusDescription: customer.payment.statusDescription,
              paymentMethod: customer.payment.paymentMethod
            }
          },
          address: {
            update: {
              zipCode: customer.address.zipCode,
              street: customer.address.street,
              numberOfHouse: customer.address.numberOfHouse,
              complement: customer.address.complement,
              neighborhood: customer.address.neighborhood,
              city: customer.address.city,
              state: customer.address.state,
              country: customer.address.country,
              fullAddress: customer.address.fullAddress
            }
          }
        },
        create: {
          apoiaseID: customer.apoiaseID,
          supporter: {
            create: {
              name: customer.supporter.name,
              cpfOrCnpj: customer.supporter.cpfOrCnpj,
              email: customer.supporter.email,
              telephone: customer.supporter.telephone
            }
          },
          payment: {
            create: {
              amount: customer.payment.amount,
              rewardTrack: customer.payment.rewardTrack,
              supportCompetence: customer.payment.supportCompetence,
              statusPayment: customer.payment.statusPayment,
              statusDescription: customer.payment.statusDescription,
              paymentMethod: customer.payment.paymentMethod
            }
          },
          address: {
            create: {
              zipCode: customer.address.zipCode,
              street: customer.address.street,
              numberOfHouse: customer.address.numberOfHouse,
              complement: customer.address.complement,
              neighborhood: customer.address.neighborhood,
              city: customer.address.city,
              state: customer.address.state,
              country: customer.address.country,
              fullAddress: customer.address.fullAddress
            }
          },
          shipping: customer.shipping,
          User: {
            connect: {
              id: userId
            }
          }
        }
      });
    });
    await Promise.all(createManyCustomers).catch(err => {
      throw new Error(_httpErrorHandler.HttpErrorHandler.targetError({
        message: err.message,
        status: 400
      }));
    });
  }

}

exports.CSVService = CSVService;