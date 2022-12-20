import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for customer', () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('Should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'teste1',
        address: {
          street: 'street',
          number: 1,
          zip: '123456',
          city: 'city'
        }
      })
      expect(response.status).toBe(200)
      expect(response.body.name).toBe('teste1')
      expect(response.body.address.street).toBe('street')
      expect(response.body.address.number).toBe(1)
      expect(response.body.address.zip).toBe('123456')
      expect(response.body.address.city).toBe('city')
  })

  it('Should not create customer', async () => {
    const response = await request(app)
    .post('/customer')
    .send({
      name: 'teste1',
    })
    expect(response.status).toBe(500)
  })

  it('Should list all customer', async () => {
    const response = await request(app)
    .post('/customer')
    .send({
      name: 'teste1',
      address: {
        street: 'street',
        number: 1,
        zip: '123456',
        city: 'city'
      }
    })
    expect(response.status).toBe(200)

    const response1 = await request(app)
    .post('/customer')
    .send({
      name: 'teste2',
      address: {
        street: 'street 2',
        number: 12,
        zip: '1234567',
        city: 'city 2'
      }
    })
    expect(response1.status).toBe(200)

    const listResult = await request(app).get('/customer').send()
    expect(listResult.status).toBe(200)
    expect(listResult.body.customers.length).toBe(2)

    const customer = listResult.body.customers[0]
    expect(customer.name).toBe('teste1')
    expect(customer.address.street).toBe('street')

    const customer1 = listResult.body.customers[1]
    expect(customer1.name).toBe('teste2')
    expect(customer1.address.street).toBe('street 2')

  })

})