# BrokeNoMore: AI Financial Advisor for College Students

An AI-powered financial decision helper specifically designed for college students to make smarter spending choices.

## Overview

BrokeNoMore analyzes users' financial transactions and helps them make informed spending decisions by considering their unique financial situation, spending habits, and the necessity of potential purchases. The application aims to prevent impulsive buying decisions and promote financial wellness among college students.

## Features

- Bank statement analysis with college-specific categorization
- AI-driven purchase decision assistant
- Student behavior learning system
- Financial health metrics tailored to academic cycles

## Getting Started

### Prerequisites

- Python 3.9+
- FastAPI
- SQLite (for development)

### Installation

```bash
# Clone the repository
git clone https://github.com/tashrique/BrokeNoMore-AI-Financial-Advisor-for-College-Students.git
cd BrokeNoMore-AI-Financial-Advisor-for-College-Students

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the application
uvicorn app.main:app --reload
```

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── endpoints/
│   │   │   ├── auth.py
│   │   │   ├── transactions.py
│   │   │   └── purchase.py
│   │   └── api.py
│   ├── core/
│   │   ├── config.py
│   │   └── security.py
│   ├── db/
│   │   ├── base.py
│   │   └── models.py
│   ├── models/
│   │   └── user.py
│   ├── services/
│   │   ├── auth.py
│   │   ├── transaction_analyzer.py
│   │   └── purchase_advisor.py
│   ├── utils/
│   │   ├── parsers.py
│   │   └── validators.py
│   └── main.py
├── tests/
│   ├── api/
│   ├── services/
│   └── conftest.py
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

## License

MIT
