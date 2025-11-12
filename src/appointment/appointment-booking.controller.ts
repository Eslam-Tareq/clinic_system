import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { PaymobService } from './appointment-booking.service';
import { Response } from 'express';

@Controller('paymob')
export class PaymobController {
  constructor(private readonly paymobService: PaymobService) {}

  @Post('init/appointment/:appointmentId')
  async initPayment(
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
  ) {
    const token = await this.paymobService.authenticate();
    const order = await this.paymobService.registerOrder(token, appointmentId);
    const paymentKey = await this.paymobService.generatePaymentKey(
      token,
      order.amount,
      order.id,
      order.appointment,
    );
    const iframeUrl = this.paymobService.buildIframeUrl(paymentKey);

    return { iframeUrl };
  }
  @Post('webhook')
  async handleWebhook(@Body() body: any, @Res() res: Response) {
    const { type, obj } = body;

    if (type === 'TRANSACTION') {
      const success = obj.success;
      const merchantOrderId = obj.order?.merchant_order_id;

      if (success) {
        // ✅ لو نجح
        // await this.appointmentRepo.update(
        //   { id: parseInt(merchantOrderId.split('-')[1]) },
        //   { is_paid: true, paid_at: new Date() },
        // );
        console.log(`✅ Appointment ${merchantOrderId} paid successfully!`);
      } else {
        // ❌ لو فشل
        console.warn(`❌ Payment failed for ${merchantOrderId}`);
      }
    }

    res.status(200).send('OK');
  }
}
