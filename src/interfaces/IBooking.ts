interface IBooking {
  id: any,
  fullName: string,
  checkIn: string,
  checkOut: string,
  orderDate: string,
  specialRequest: string,
  room: number,
  status: string,
  price: string
}

export default IBooking;