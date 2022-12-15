import Address from "../value-object/address"
import CustomerFactory from "./customer.factory"
describe('Customer factory unit test', () => {

  it('Should create a customer', () => {
    let customer = CustomerFactory.create('john')

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('john')
    expect(customer.Address).toBeUndefined()
  })

  it('Should create a customer with an address', () => {
    const address = new Address('street', 1, '11111-111', 'Recife')
    let customer = CustomerFactory.createWithAddress('john', address)

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('john')
    expect(customer.Address).toBe(address)

  })
})