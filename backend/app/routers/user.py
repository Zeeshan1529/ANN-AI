from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi.security import OAuth2PasswordRequestForm

from app.database import get_db
from app.models import User
from app.schemas import UserCreate, UserResponse, Token
from app.auth import hash_password, verify_password, create_access_token
from app.auth import get_current_user

router = APIRouter()


# CREATE USER
@router.post("/users/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    hashed_pw = hash_password(user.password)

    db_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_pw
    )

    db.add(db_user)

    try:
        db.commit()
        db.refresh(db_user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email already exists")

    return db_user


# READ USERS
@router.get("/users/", response_model=list[UserResponse])
def read_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(User).all()


# UPDATE USER
@router.put("/users/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db_user.name = user.name
    db_user.email = user.email

    try:
        db.commit()
        db.refresh(db_user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email already exists")

    return db_user


# DELETE USER
@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(db_user)
    db.commit()

    return {"message": "User deleted successfully"}


# LOGIN
@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token = create_access_token({"sub": user.email})

    return {
  "access_token": access_token,
  "token_type": "bearer",
  "role": user.role
}


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/student/test")
def student_test(current_user: User = Depends(get_current_user)):
    if current_user.role != "student":
        raise HTTPException(status_code=403, detail="Student only")
    return {"message": "Student route working", "email": current_user.email}


@router.get("/mess/test")
def mess_test(current_user: User = Depends(get_current_user)):
    if current_user.role != "mess_incharge":
        raise HTTPException(status_code=403, detail="Mess Incharge only")
    return {"message": "Mess Incharge route working", "email": current_user.email}


@router.get("/admin/test")
def admin_test(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    return {"message": "Admin route working", "email": current_user.email}