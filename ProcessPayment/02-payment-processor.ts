declare function makeSecurePaymentRequest(gatewayUrl: string, payment: Payment): any;

interface Payment {
  amount: number;
  cardNumber: string;
  cvv: string;
}

interface PaymentProcessor {
  process(payment: Payment): Promise<PaymentResult>;
}

class PaymentGatewayAdapter implements PaymentProcessor {
  constructor(private readonly gatewayUrl: string) {}

  async process(payment: Payment): Promise<PaymentResult> {
    const response = await makeSecurePaymentRequest(this.gatewayUrl, payment);
    return new PaymentResult(response.success, response.errorMessage);
  }
}

class PaymentResult {
  constructor(public readonly success: boolean, public readonly errorMessage?: string) {}
}