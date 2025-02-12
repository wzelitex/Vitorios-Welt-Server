type TypesEmails = 'Nuevo pedido.' | '';

export interface ISendEmail {
  type: TypesEmails;
  to: string;
  from: string;
  subject: string;
  text: string;
}
