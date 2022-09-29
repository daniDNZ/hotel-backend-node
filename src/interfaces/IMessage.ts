interface IMessage {
  id?: any;
  date: Date;
  customer: string;
  email: string;
  phone: string;
  subject: string;
  comment: string;
  status: boolean;
}

export default IMessage;