interface IRoom {
  id: any;
  type: string;
  number: number;
  price: string;
  amenities: string[];
  photos: string;
  description: string;
  offer: boolean;
  discount: number;
  cancellation: string;
}

export default IRoom;