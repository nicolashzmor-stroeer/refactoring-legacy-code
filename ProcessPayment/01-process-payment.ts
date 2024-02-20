declare function makePaymentRequest(amount: number, cardNumber: string, cvv: string): any;
// PaymentService.ts
function processPayment(amount: number, cardNumber: string, cvv: string) {
  // Direct interaction with payment gateway API (unsecure)
  const paymentGatewayResponse = makePaymentRequest(amount, cardNumber, cvv);

  if (paymentGatewayResponse.success) {
    return true;
  } else {
    // Handle error generically, no specific feedback
    throw new Error("Payment failed");
  }
}