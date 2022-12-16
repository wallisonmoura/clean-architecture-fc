import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress('teste', 
  new Address('street', 1, 'zip', 'city')
)

const input = {
  id: customer.id,
  name: 'teste update',
  address: {
    street: 'street update',
    number: 123,
    zip: 'zip update',
    city: 'city update'
  }
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
  }
}

describe('Unit test for customer update use case', () => {

  it('Should update a customer', async () => {
    const customerRepository = MockRepository()
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)

    const output = await customerUpdateUseCase.execute(input)

    expect(output).toEqual(input)

  })
})