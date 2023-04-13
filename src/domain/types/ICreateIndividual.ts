interface ICreateIndividual {
  cpf: string;
  name: string;
  birthDate: Date;
  gender: number;
  userId?: number;
}

interface ICreateIndividualRequest {
  cpf: string;
  name: string;
  birthDate: Date;
  gender: string;
  userId?: number;
}

export { ICreateIndividual, ICreateIndividualRequest };
