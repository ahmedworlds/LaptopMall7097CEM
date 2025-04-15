/* eslint-env jest */

const productItem = {
  id: 1,
  name: "MacBook Pro",
  brand: "Apple",
  price: 1299,
  image: "macbook.jpg",
  specifications: "M2 chip, 16GB RAM, 512GB SSD",
  rating: 4.5
};

describe('Product Data Structure', () => {
  test('product has required properties', () => {
    expect(productItem).toHaveProperty('id');
    expect(productItem).toHaveProperty('name');
    expect(productItem).toHaveProperty('brand');
    expect(productItem).toHaveProperty('price');
    expect(productItem).toHaveProperty('image');
    expect(productItem).toHaveProperty('specifications');
    expect(productItem).toHaveProperty('rating');
  });

  test('product has correct data types', () => {
    expect(typeof productItem.id).toBe('number');
    expect(typeof productItem.name).toBe('string');
    expect(typeof productItem.brand).toBe('string');
    expect(typeof productItem.price).toBe('number');
    expect(typeof productItem.image).toBe('string');
    expect(typeof productItem.specifications).toBe('string');
    expect(typeof productItem.rating).toBe('number');
  });

  test('product values are valid', () => {
    expect(productItem.id).toBeGreaterThan(0);
    expect(productItem.name.length).toBeGreaterThan(0);
    expect(productItem.brand.length).toBeGreaterThan(0);
    expect(productItem.price).toBeGreaterThan(0);
    expect(productItem.specifications.length).toBeGreaterThan(0);
    expect(productItem.rating).toBeGreaterThanOrEqual(0);
    expect(productItem.rating).toBeLessThanOrEqual(5);
  });
});