interface IUser {
  id?: any,
  photoId: Number,
  fullName: string,
  job: string,
  email: string,
  phone: string,
  startDate: Date,
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