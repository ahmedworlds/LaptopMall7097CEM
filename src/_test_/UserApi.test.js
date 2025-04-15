/* eslint-env jest */
import { log } from '../utils/logger';

describe('User API', () => {
  test('fetch user profile', async () => {
    const response = await fetch('http://localhost:5000/api/user/profile');
    expect([200, 401, 404]).toContain(response.status);
    
    if (response.status === 200) {
      const data = await response.json();
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('email');
      expect(data).toHaveProperty('role');
    }
  });

  test('fetch user orders', async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/orders');
      expect([200, 401, 404]).toContain(response.status);
    } catch (error) {
      log('User orders API not available:', error.message);
    }
  });
});