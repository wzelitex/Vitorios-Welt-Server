export interface IUpdateUser {
  username?: string;
  email?: string;
  phone?: number;
  lada?: number;
  currency?: string;
}

export interface IUpdateLocationUser {
  number?: string;
  street?: string;
  zipCode?: number;
  cologne?: string;
  municipality?: string;
  state?: string;
  country?: string;
}
