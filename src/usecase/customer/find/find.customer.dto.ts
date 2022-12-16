export interface InputFindCustomerDto {
  id: string
}

export interface OutputFincCustomerDto {
  id: string
  name: string
  address: {
    street: string
    number: number
    zip: string
    city: string
  }
}