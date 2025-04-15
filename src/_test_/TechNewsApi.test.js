/* eslint-env jest */

describe('Tech News API', () => {
  test('fetch tech news from API', async () => {
    const response = await fetch('http://localhost:5000/api/technews');
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty('title');
    expect(data[0]).toHaveProperty('summary');
    expect(data[0]).toHaveProperty('date');
  });
});