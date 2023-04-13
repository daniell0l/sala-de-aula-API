interface ICreateUser {
  id?: number;
  email?: string;
  hashPassword: string;
  secret?: string;
}

export { ICreateUser };
