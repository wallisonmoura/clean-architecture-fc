import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { FindCustomerUseCase } from "./find.customer.usecase";

describe('Test find customer use case',() => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a customer',async () => {

    const customerRepository = new CustomerRepository()
    const usecase = new FindCustomerUseCase(customerRepository)
    
    const customer = new Customer('123', 'customer 1')
    const address = new Address('street 1', 1, '123456', 'city 1')
    customer.changeAddress(address)

    await customerRepository.create(customer)

    const input = {
      id: '123'
    }

    const output = {
      id: '123',
      name: 'customer 1',
      address: {
        street: 'street 1',
        number: 1,
        zip: '123456',
        city: 'city 1'
      }
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)

  })
})