# BrokeNoMore - AI Financial Advisor for College Students

BrokeNoMore is an AI-powered financial advisor designed specifically for college students. It helps users manage their finances, track expenses, and make smarter financial decisions during their college years.

## Project Structure

The project is organized into two main directories:

- `backend/`: FastAPI backend with SQLite database
- `frontend/`: Next.js frontend with TypeScript and Tailwind CSS

## Features

- Google OAuth authentication
- Expense tracking and categorization
- Budget planning and management
- Financial insights and recommendations
- Financial education resources

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your Google OAuth credentials

5. Run the backend server:
   ```
   python run.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Update the values in `.env.local` with your Google OAuth credentials

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
