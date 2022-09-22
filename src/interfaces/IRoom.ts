interface IRoom {
  id?: any;
  type: string;
  number: number;
  price: Number;
  amenities: string;
  description: string;
  offer: boolean;
  discount: number;
  cancellation: string;
}

export default IRoom;