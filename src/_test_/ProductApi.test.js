/* eslint-env jest */

describe('Product API', () => {

  test('fetch products from API', async () => {
    const response = await fetch('http://localhost:5000/api/products');
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  test('fetch products from API', async () => {
    const response = await fetch('http://localhost:5000/api/products');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  test('API response time should be under 200ms', async () => {
    const startTime = performance.now();
    const response = await fetch('http://localhost:5000/api/products');
    const endTime = performance.now();
    const responseTime = endTime - startTime;

    expect(response.status).toBe(200);
    expect(responseTime).toBeLessThan(200); // Response should be under 200ms
  });

  test('API should handle multiple concurrent requests', async () => {
    const requests = Array(10).fill().map(() => 
      fetch('http://localhost:5000/api/products')
    );
    
    const responses = await Promise.all(requests);
    responses.forEach(response => {
      expect(response.status).toBe(200);
    });
  });
});