declare type FraudDetector = any;
declare type RefundService = any;
// PaymentProcessor.ts
interface Payment {
  amount: number;
  cardNumber: string;
  cvv: string;
}

interface PaymentProcessor {
  process(payment: Payment): Promise<PaymentResult>;
}

class PaymentServiceImpl implements PaymentProcessor {
  constructor(
    private readonly gatewayUrl: string,
    private readonly fraudDetector: FraudDetector,
    private readonly refundService: RefundService,
  ) {}

  async process(payment: Payment): Promise<PaymentResult> {
    if (await this.fraudDetector.isFraudulent(payment)) {
      return new PaymentResult(false, "Payment flagged as fraudulent");
    }

    const response = await makeSecurePaymentRequest(this.gatewayUrl, payment);

    if (!response.success) {
      return new PaymentResult(false, response.errorMessage);
    }

    try {
      await this.refundService.createRefund(payment.amount); // Refund on success
    } catch (error) {
      console.error("Failed to create refund:", error);
    }

    return new PaymentResult(true, "Payment successful");
  }
}