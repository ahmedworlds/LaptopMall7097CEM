/* eslint-env jest */

const paymentDetails = {
  amount: 1299.99,
  currency: 'gbp',
  paymentMethod: 'card'
};

describe('Payment Processing', () => {
  test('payment details validation', () => {
    expect(paymentDetails.amount).toBeGreaterThan(0);
    expect(paymentDetails.currency).toBe('gbp');
    expect(['card']).toContain(paymentDetails.paymentMethod);
  });
});