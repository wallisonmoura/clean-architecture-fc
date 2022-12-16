import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import { FindCustomerUseCase } from "./find.customer.usecase";

const customer = new Customer('123', 'customer 1')
const address = new Address('street 1', 1, '123456', 'city 1')
customer.changeAddress(address)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit Test find customer use case',() => {
  
  it('should find a customer',async () => {
    const customerRepository = MockRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

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

  it('Should not find a customer', () => {
    const customerRepository = MockRepository()
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found')
    })
    const usecase = new FindCustomerUseCase(customerRepository)

    const input = {
      id: '123'
    }
    expect(() => {
      return usecase.execute(input)
    }).rejects.toThrow('Customer not found')

  })
})