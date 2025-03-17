from typing import Optional
from sqlalchemy.orm import Session

from app.db.models import User
from app.models.user import UserCreate

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """
    Get a user by email
    """
    return db.query(User).filter(User.email == email).first()

def get_user_by_google_id(db: Session, google_id: str) -> Optional[User]:
    """
    Get a user by Google ID
    """
    return db.query(User).filter(User.google_id == google_id).first()

def create_user(db: Session, user_data: UserCreate) -> User:
    """
    Create a new user
    """
    db_user = User(
        email=user_data.email,
        google_id=user_data.google_id,
        is_active=True
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_or_create_user(db: Session, user_data: UserCreate) -> User:
    """
    Get a user by Google ID or create a new one if not exists
    """
    db_user = get_user_by_google_id(db, user_data.google_id)
    if db_user:
        return db_user
    return create_user(db, user_data) 