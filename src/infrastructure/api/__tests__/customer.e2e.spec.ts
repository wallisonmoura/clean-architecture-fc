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

})