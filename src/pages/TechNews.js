import React, { useState, useEffect } from 'react';
import TechNewsService from '../services/TechNewsService';

// tech news and updates
const TechNews = () => {
  const [news, setNews] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [qaData, setQaData] = useState([]);

  useEffect(() => {
    fetchNews();
    fetchQaData();
  }, []);

  const fetchQaData = async () => {
    try {
      const res = await fetch('/data/tech-qa.json');
      const data = await res.json();
      setQaData(data.qa);
    } catch (err) {
      // log('Error loading QA data:', err);
    }
  };

  const fetchNews = async () => {
    try {
      const newsData = await TechNewsService.getNews();
      setNews(newsData);
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      // log('Error fetching news:', err);
      setNews([]);
    }
  };

  const handleQuestion = () => {
    const qa = qaData.find(item => 
      item.question.toLowerCase().includes(question.toLowerCase())
    );
    setAnswer(qa ? qa.answer : "Sorry, I don't have an answer for that question.");
    setQuestion('');
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Tech News</h2>
        <small>Last updated: {lastUpdated}</small>
      </div>
      
      <div className="list-group">
        {Array.isArray(news) && news.map(item => (
          <div key={item.id} className="list-group-item">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <i className={`fas ${item.icon} fa-2x text-primary`}></i>
              </div>
              <div>
                <h5>{item.title}</h5>
                <p className="mb-1">{item.summary}</p>
                <small className="text-muted">
                  {new Date(item.date).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Chat widget remains unchanged */}
      <div className={`chat-widget ${isChatOpen ? 'open' : ''}`} style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}>
        <button 
          className="btn btn-dark rounded-circle p-3"
          onClick={() => setIsChatOpen(!isChatOpen)}
          style={{ width: '60px', height: '60px' }}
        >
          {isChatOpen ? '✕' : '💬'}
        </button>
        
        {isChatOpen && (
          <div className="card" style={{ 
            position: 'absolute', 
            bottom: '70px', 
            right: '0',
            width: '300px'
          }}>
            <div className="card-header bg-dark text-white">
              Tech Assistant
            </div>
            <div className="card-body">
              <div className="mb-3" style={{ minHeight: '100px' }}>
                {answer && <p>{answer}</p>}
              </div>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ask about SSD, RAM..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleQuestion()}
                />
                <button 
                  className="btn btn-dark"
                  onClick={handleQuestion}
                >
                  Ask
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechNews;
