# BrokeNoMore: Project Summary and Development Plan

## Project Overview
BrokeNoMore is an AI-powered financial decision helper specifically designed for college students. The application analyzes users' financial transactions and helps them make informed spending decisions by considering their unique financial situation, spending habits, and the necessity of potential purchases.

## Target Audience
- College students (18-25 years old)
- Limited income (part-time jobs, allowances, financial aid)
- Developing financial literacy
- Facing unique financial challenges (tuition, textbooks, social expenses)

## Core Features
1. **Bank Statement Analysis**: Upload and analyze bank statements with college-specific categorization
2. **AI Purchase Decision Assistant**: Evaluate potential purchases and provide recommendations
3. **User Behavior Learning**: Track and learn from financial behavior over time
4. **Academic Cycle Awareness**: Provide context-aware recommendations based on academic calendar

## Development Phases

### Phase 1: MVP Backend Development
The first phase focuses on building a functional backend API with the core features:

1. **Project Setup and Environment Configuration** (Issue #1)
   - Set up project structure
   - Configure development environment
   - Set up FastAPI application
   - Configure database

2. **Authentication System Implementation** (Issue #2)
   - Implement Google OAuth 2.0
   - Create JWT-based session management
   - Set up user registration and login flows

3. **Bank Statement Parser and Analyzer** (Issue #3)
   - Develop CSV and PDF parsers
   - Create transaction categorization system
   - Implement college-specific categories
   - Build analysis algorithms

4. **AI Purchase Decision Assistant** (Issue #4)
   - Create product link parser
   - Develop AI decision-making system
   - Implement questioning system
   - Build recommendation generation

5. **User Behavior Tracking System** (Issue #5)
   - Design behavior tracking schema
   - Implement financial profile generation
   - Create spending pattern analysis
   - Build learning mechanisms

### Phase 2: Enhanced AI & Frontend
The second phase expands on the MVP with advanced features and a user-friendly frontend:

1. **Consensus Learning with Multiple AI Models** (Issue #6)
   - Integrate multiple AI models
   - Implement consensus learning
   - Set up Comet.ml tracking
   - Create model performance evaluation

2. **Next.js Frontend Development** (Issue #7)
   - Build responsive UI with Tailwind CSS
   - Create dashboard for financial insights
   - Implement transaction visualization
   - Design student-friendly interface

3. **Product Link Analyzer Enhancement** (Issue #8)
   - Support more e-commerce sites
   - Implement price comparison
   - Add student discount detection
   - Create textbook-specific analysis

4. **Academic Calendar Integration** (Issue #9)
   - Create academic term detection
   - Implement spending analysis by academic period
   - Track financial aid disbursements
   - Adjust recommendations based on academic cycle

5. **Notification System and User Feedback Loop** (Issue #10)
   - Implement multi-channel notifications
   - Create user feedback collection
   - Build recommendation improvement system
   - Set up A/B testing

6. **Plaid API Integration (Optional)** (Issue #11)
   - Set up secure bank account linking
   - Implement transaction synchronization
   - Create real-time balance checking
   - Add privacy controls

## Getting Started

To start working on this project:

1. Clone the repository:
   ```
   git clone https://github.com/tashrique/BrokeNoMore-AI-Financial-Advisor-for-College-Students.git
   cd BrokeNoMore-AI-Financial-Advisor-for-College-Students
   ```

2. Set up the virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Create a `.env` file based on `.env.example`

4. Run the application:
   ```
   uvicorn app.main:app --reload
   ```

## Contributing

1. Pick an issue to work on from the [Issues](https://github.com/tashrique/BrokeNoMore-AI-Financial-Advisor-for-College-Students/issues) page
2. Create a new branch for your feature
3. Implement the feature following the project's coding standards
4. Submit a pull request

## Technology Stack
- **Backend:** Python (FastAPI)
- **Database:** SQLite (MVP), PostgreSQL (production)
- **AI Models:** Ensemble approach with multiple models
- **ML Tracking:** Comet.ml
- **Frontend:** Next.js with Tailwind CSS
- **Authentication:** Google OAuth 2.0