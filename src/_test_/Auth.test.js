/* eslint-env jest */

const userCredentials = {
  email: 'test@example.com',
  password: 'Password123!',
  role: 'user'
};

describe('User Authentication', () => {
  test('user credentials format', () => {
    expect(userCredentials.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(userCredentials.password.length).toBeGreaterThanOrEqual(8);
    expect(['admin', 'user']).toContain(userCredentials.role);
  });
});