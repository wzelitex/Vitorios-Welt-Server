type TNotifications = 'Nuevo pedido.' | 'Nuevo producto.';

export interface ISendEmail {
  type: TNotifications;
  to: string;
  from: string;
  subject: string;
  text: string;
}
