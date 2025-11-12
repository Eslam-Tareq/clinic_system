import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Appointment } from './appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymobService {
  constructor(
    @InjectRepository(Appointment)
    private readonly AppointmentRepo: Repository<Appointment>,
  ) {}
  private readonly PAYMOB_API_KEY = process.env.PAYMOB_API_KEY; // from your Paymob dashboard
  private readonly INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID; // for card, wallet, etc.
  private readonly BASE_URL = 'https://accept.paymob.com/api';

  // 1️⃣ Step: Get auth token
  async authenticate(): Promise<string> {
    const response = await axios.post(`${this.BASE_URL}/auth/tokens`, {
      api_key: this.PAYMOB_API_KEY,
    });
    return response.data.token;
  }

  // 2️⃣ Step: Register order
  async registerOrder(token: string, appointmentId: number) {
    const appointment = await this.AppointmentRepo.findOne({
      where: { id: appointmentId },
      relations: ['appointment_type', 'user'],
    });
    if (!appointment) {
      throw new NotFoundException(`appointment not found`);
    }

    const response = await axios.post(`${this.BASE_URL}/ecommerce/orders`, {
      auth_token: token,
      delivery_needed: false,
      amount_cents: (appointment.appointment_type.price * 100).toString(), // Paymob needs cents
      currency: 'EGP',
      merchant_order_id: `appointment-${appointmentId}`,
      items: [
        {
          name: appointment.appointment_type.type,
          amount_cents: (appointment.appointment_type.price * 100).toString(),
          description:
            appointment.appointment_type.description || 'Appointment booking',
          quantity: 1,
        },
      ],
    });
    return {
      ...response.data,
      appointment,
      amount: appointment.appointment_type.price,
    };
  }

  // 3️⃣ Step: Generate payment key
  async generatePaymentKey(
    token: string,
    amount: number,
    orderId: number,
    billingData: Appointment,
  ) {
    const response = await axios.post(
      `${this.BASE_URL}/acceptance/payment_keys`,
      {
        auth_token: token,
        amount_cents: (amount * 100).toString(),
        expiration: 3600,
        order_id: orderId,
        billing_data: {
          apartment: 'NA',
          email: billingData.user.email,
          floor: 'NA',
          first_name: billingData.user.first_name,
          street: 'NA',
          building: 'NA',
          phone_number: billingData.user.phone,
          shipping_method: 'NA',
          postal_code: 'NA',
          city: 'NA',
          country: 'EG',
          last_name: billingData.user.last_name,
          state: 'NA',
        },
        currency: 'EGP',
        integration_id: this.INTEGRATION_ID,
      },
    );

    return response.data.token;
  }

  // 4️⃣ Step: Build iframe URL
  buildIframeUrl(paymentKey: string): string {
    const iframeId = process.env.PAYMOB_CREDIT_CARD_IFRAME_ID;
    return `https://accept.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${paymentKey}`;
  }
}
