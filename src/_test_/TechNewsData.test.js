/* eslint-env jest */

const techNewsItem = {
  id: 1,
  title: "Test News",
  summary: "Test Summary",
  date: "2024-03-19",
  icon: "fa-laptop",
  category: "test"
};

describe('Tech News Data Structure', () => {
  test('news item has required properties', () => {
    expect(techNewsItem).toHaveProperty('id');
    expect(techNewsItem).toHaveProperty('title');
    expect(techNewsItem).toHaveProperty('summary');
    expect(techNewsItem).toHaveProperty('date');
    expect(techNewsItem).toHaveProperty('icon');
    expect(techNewsItem).toHaveProperty('category');
  });

  test('news item has correct data types', () => {
    expect(typeof techNewsItem.id).toBe('number');
    expect(typeof techNewsItem.title).toBe('string');
    expect(typeof techNewsItem.summary).toBe('string');
    expect(typeof techNewsItem.date).toBe('string');
    expect(typeof techNewsItem.icon).toBe('string');
    expect(typeof techNewsItem.category).toBe('string');
  });

  test('news item values are valid', () => {
    // Check if values are not empty
    expect(techNewsItem.title.length).toBeGreaterThan(0);
    expect(techNewsItem.summary.length).toBeGreaterThan(0);
    expect(techNewsItem.icon.length).toBeGreaterThan(0);
    expect(techNewsItem.category.length).toBeGreaterThan(0);
    
    // Check date format (YYYY-MM-DD)
    expect(techNewsItem.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    
    // Check if ID is positive
    expect(techNewsItem.id).toBeGreaterThan(0);
  });
});