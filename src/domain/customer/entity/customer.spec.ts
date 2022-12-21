import Address from "../value-object/address"
import Customer from "./customer"

describe('Customer unit tests', () => {

  it('Should throw error when id is empty', () => {
    expect(() => {
      let customer = new Customer('', 'wallison')
    }).toThrowError("customer: Id is required")
  })

  it('Should throw error when name is empty', () => {
    expect(() => {
      let customer = new Customer('123', '')
    }).toThrowError('customer: Name is required')
  })

  it('Should throw error when id is and name empty', () => {
    expect(() => {
      let customer = new Customer('', '')
    }).toThrowError('customer: Id is required,customer: Name is required')
  })

  it('Should change name', () => {
    const customer = new Customer('123', 'Customer 1')
    customer.changeName('Customer 2')
   
    expect(customer.name).toBe('Customer 2')
  })

  it('Should activate customer', () => {
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('street 1', 123, '12345-987', 'Recife')
    customer.Address = address

    customer.activate()
   
    expect(customer.isActive()).toBe(true)
  })

  it('Should throw error when address is undefined when you activate a customer', () => {

    expect(() => {
      const customer = new Customer('123', 'Customer 1')
      customer.activate()
    }).toThrowError("Address is mandatory to activate a customer")
  })

  it('should deactivate customer', () => {
    const customer = new Customer('123', 'Customer 1')

    customer.deactivate()
   
    expect(customer.isActive()).toBe(false)
  })

  it('Should add reward points', () => {
    const customer = new Customer('c1', 'Customer 1')
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)
   
    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)

  })
})