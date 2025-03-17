# BrokeNoMore: AI Financial Advisor for College Students

## Overview
BrokeNoMore is an AI-powered financial decision helper specifically designed for college students who are still developing their financial literacy. The system analyzes users' financial transactions and helps them make informed spending decisions by considering their unique financial situation, spending habits, and the necessity of potential purchases. The application aims to prevent impulsive buying decisions and promote financial wellness among college students.

## Target Audience
- College students (18-25 years old)
- Limited income (part-time jobs, allowances, financial aid)
- Developing financial literacy
- Facing unique financial challenges (tuition, textbooks, social expenses)

## Tech Stack
- **Backend:** Python (FastAPI)
- **Authentication:** Google OAuth 2.0 (JWT-based session management)
- **Database:** SQLite (MVP), PostgreSQL (production)
- **AI Models:** 
  - Ensemble approach with multiple models (GPT-4, Claude, etc.)
  - Consensus learning for more reliable recommendations
  - Fine-tuned for college student financial patterns
- **ML Tracking:** Comet.ml for experiment tracking and model optimization
- **APIs:**
  - Plaid API (future integration for bank transaction data)
  - Amazon Product API (for product data extraction)
- **Frontend:** Next.js with Tailwind CSS (Phase 2)

## Core Features

### 1. **College-Focused User Authentication**
- Google OAuth 2.0 (most college students have Google accounts)
- College email domain verification (optional)
- Simple onboarding process with college-specific financial questions

### 2. **Bank Statement Analysis for Students**
- Manual bank statement upload (CSV, PDF parsing)
- College-specific transaction categorization:
  - Education expenses (tuition, books, supplies)
  - Housing & utilities
  - Food (dining hall, groceries, eating out)
  - Entertainment & social
  - Transportation
  - Side hustles & income
- Visualization of spending patterns relevant to academic terms

### 3. **AI-Driven Purchase Decision Assistant**
- User inputs a product link (Amazon, etc.)
- AI analyzes the purchase considering:
  - Current account balance
  - Upcoming known expenses (rent, tuition installments)
  - Spending trends during academic year vs. breaks
  - Necessity vs. want classification
- Interactive questioning:
  - "Is this for a class or personal use?"
  - "Do you need this immediately or can it wait?"
  - "Have you researched alternatives or used textbook options?"
  - "How many hours of work would this cost you at your current wage?"
- Recommendations tailored to student life:
  - Buy now (if affordable and necessary)
  - Wait until financial aid disbursement
  - Check university resources first (library, equipment rental)
  - Find used/cheaper alternatives
  - Avoid purchase (with specific reasoning)

### 4. **Student Behavior Learning System**
- Tracks spending patterns around key academic dates
- Learns individual tolerance for financial advice
- Adapts recommendations based on compliance with previous advice
- Considers academic schedule (midterms, finals) when making recommendations

### 5. **API Endpoints**

#### **Authentication**
- `POST /auth/login` – Google OAuth login
- `POST /auth/logout` – Logout user
- `GET /auth/profile` – Get user profile information

#### **Bank Statement Processing**
- `POST /transactions/upload` – Upload and process a bank statement
- `GET /transactions/analyze` – Retrieve categorized spending insights
- `GET /transactions/academic-cycle` – View spending patterns by academic term

#### **Purchase Decision Assistant**
- `POST /purchase/evaluate` – Analyze a product link and return a spending decision
- `POST /purchase/feedback` – User feedback on purchase decision (did they follow advice)

#### **Financial Health Metrics**
- `GET /metrics/overview` – Get overall financial health score
- `GET /metrics/spending-trends` – Get spending trends analysis
- `GET /metrics/recommendations` – Get personalized financial recommendations

## Development Phases

### Phase 1: MVP Backend Development
1. Set up project structure and environment
2. Implement authentication system
3. Develop bank statement parser and analyzer
4. Create basic AI decision assistant
5. Implement user behavior tracking
6. Set up Comet.ml integration for model tracking
7. Develop API endpoints
8. Write comprehensive tests
9. Deploy MVP backend

### Phase 2: Enhanced AI & Frontend
1. Implement consensus learning with multiple AI models
2. Develop Next.js frontend with student-friendly UI
3. Create interactive dashboard for financial insights
4. Implement product link analyzer
5. Add academic calendar integration
6. Develop notification system for financial alerts
7. Enhance user feedback loop for AI improvement
8. Implement Plaid API integration (optional)

## Security & Privacy Considerations
- Store all financial data locally for privacy
- Encrypt sensitive information
- Implement proper authentication and authorization
- Regular security audits
- Clear data retention and deletion policies
- Transparent privacy policy for college students

## Future Enhancements
- **Peer Comparison:** Anonymous comparison with peers in similar financial situations
- **Financial Education:** Integrated learning modules on financial literacy
- **Scholarship Finder:** Integration with scholarship databases
- **Budget Planner:** Academic term-based budget planning tool
- **Side Hustle Recommendations:** Suggestions for income opportunities based on schedule
- **Textbook Price Comparison:** Find the best deals on required textbooks