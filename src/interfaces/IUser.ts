interface IUser {
  id: any,
  photo: string,
  fullName: string,
  job: string,
  email: string,
  phone: string,
  startDate: string,
  functions: string,
  state: string,
  password: string
}

interface IUserData {
  email: string;
  password: string;
}

export default IUser;
export { IUserData };