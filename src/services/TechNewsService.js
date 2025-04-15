import TechNewsModel from '../models/TechNewsModel';

// gets tech news from backend
class TechNewsService {
  // get all the newz
  static async getNews() {
    try {
      const response = await fetch('/api/technews');
      const data = await response.json();
      return data.map(item => new TechNewsModel(
        item.id,
        item.title,
        item.summary,
        item.date,
        item.icon,
        item.category
      ));
    } catch {
      return [];
    }
  }
}

export default TechNewsService;