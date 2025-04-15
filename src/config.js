const isProduction = process.env.NODE_ENV === 'production';

export const API_BASE_URL = isProduction
  ? 'https://laptopmall-backend.onrender.com'
  : 'http://localhost:5000';

export const FRONTEND_URL = isProduction
  ? 'https://laptopmall-frontend.onrender.com'
  : 'http://localhost:3000';