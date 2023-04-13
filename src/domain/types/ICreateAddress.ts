interface ICreateAddress {
  id?: number;
  street: string;
  neighborhood: string;
  number?: string;
  complement?: string;
  city: string;
  state: string;
  zipCode: string;
  individualId?: number;
  entityId?: number;
}

export { ICreateAddress };
