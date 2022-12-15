import Order from "./order"
import OrderItem from "./order_item"


describe('Order unit tests', () => {

  it('should throw error when id is empty', () => {
   expect(() => {
    let order = new Order('', '123', [])
   }).toThrowError('Id is required')
  })

  it('should throw error when customerId is empty', () => {
    expect(() => {
     let order = new Order('1', '', [])
    }).toThrowError('CustomerId is required')
   })

   it('should throw error when customerId is empty', () => {
    expect(() => {
     let order = new Order('1', '123', [])
    }).toThrowError('Item are required')
   })

   it('should calculate total', () => {
    const item = new OrderItem('i1', 'item1', 100, 'p1', 2)
    const item2 = new OrderItem('i2', 'item2', 200, 'p2', 2)
    const order = new Order('o1', '123', [item])

    let total = order.total()
   
    expect(total).toBe(200)

    const order2 = new Order('o2', '123', [item, item2])
    total = order2.total()
    
    expect(total).toBe(600)
   })

   it('should throw error if the item quantity is less or equal zero', () => {
    expect(() => {
      const item = new OrderItem('i1', 'item1', 100, 'p1', 0)
      const order = new Order('o1', '123', [item])
    }).toThrowError('Quantity must be greater than 0')
   })
})