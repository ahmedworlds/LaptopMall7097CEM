/* eslint-env jest */

const cartItem = {
  productId: 1,
  quantity: 2,
  price: 1299.99,
  name: "Test Product"
};

describe('Shopping Cart', () => {
  test('cart item structure', () => {
    expect(cartItem.productId).toBeGreaterThan(0);
    expect(cartItem.quantity).toBeGreaterThan(0);
    expect(cartItem.price).toBeGreaterThan(0);
    expect(cartItem.name.length).toBeGreaterThan(0);
  });
});