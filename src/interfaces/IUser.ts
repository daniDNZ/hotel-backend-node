interface IUser {
  id?: any,
  photo: string,
  fullName: string,
  job: string,
  email: string,
  phone: string,
  startDate: Date,
  functions: string,
  status: boolean,
  password: string
}

interface IUserData {
  email: string;
  password: string;
}

export default IUser;
export { IUserData };