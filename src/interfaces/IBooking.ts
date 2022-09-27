interface IBooking {
  id?: any,
  fullName: string,
  checkIn: Date,
  checkOut: Date,
  orderDate: Date,
  specialRequest: string,
  status: string,
  price: Number,
  rooms: Array<any>
}

export default IBooking;