import { Injectable } from '@nestjs/common';
import {
  IPayerPayment,
  IOptionsPayment,
  IPaymentItems,
} from 'src/types/payments.types';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { KeysPayments, BackRulsPayments } from 'src/enums/Payments.enums';
import { ResponseServerService } from './ResponseServer.utils';
import { StatusCode } from 'src/enums/StatusCode';

@Injectable()
export class PaymentsService {
  private readonly client: MercadoPagoConfig;

  constructor(private readonly responseService: ResponseServerService) {
    this.client = new MercadoPagoConfig({
      accessToken: KeysPayments.accessToken,
      options: {
        timeout: 5000,
      },
    });
  }

  async payOrders(
    orders: IPaymentItems[],
    payer: IPayerPayment,
    options: IOptionsPayment,
  ) {
    try {
      const body = {
        items: orders.map((item) => ({
          id: item._id.toString(),
          title: item.name,
          currency_id: item.currency_id || 'MXN',
          quantity: item.quantity,
          unit_price: item.total / item.quantity,
        })),
        payer: {
          email: 'TESTUSER313395807',
          name: payer.username,
          address: {
            zip_code: payer.zipCode.toString(),
            street_name: payer.street,
            city_name: payer.municipality,
            state_name: payer.state,
            country_name: payer.country,
          },
        },
        back_urls: {
          success: BackRulsPayments.success || 'http://localhost:3000/success',
          failure: BackRulsPayments.failure || 'http://localhost:3000/failure',
          pending: BackRulsPayments.pending || 'http://localhost:3000/pending',
        },
        auto_return: 'approved',
        external_reference: options.userId,
        binary_mode: true,
        shipments: {
          receiver_address: {
            zip_code: payer.zipCode.toString(),
            street_name: payer.street,
            city_name: payer.municipality,
            state_name: payer.state,
            country_name: payer.country,
          },
        },
      };

      const preference = new Preference(this.client);
      return await preference.create({ body: body });
    } catch (error) {
      this.responseService.error(
        StatusCode.INTERNAL_SERVER_ERROR,
        'Error al realizar el pago.',
        error,
      );
    }
  }
}
