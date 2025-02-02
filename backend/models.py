from flask import Flask
from flask_sqlalchemy import SQLAlchemy
#is an extension for Flask that simplifies the use of SQLAlchemy for database operations.
from sqlalchemy import MetaData
#is  SQLAlchemy object that helps manage the database schema and metadata (such as tables and relationships)
metadata = MetaData()
# An instance of the MetaData class to hold the schema details of the database.
db = SQLAlchemy(metadata=metadata)


from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), nullable=False)
    password = db.Column(db.String(512), nullable=False)
    full_name = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(128), nullable=False)
    class_id = db.Column(db.Integer, ForeignKey('class.id'), nullable=False)

    # Define the relationship to the Class table
    class_ = relationship('Class', backref='students' ,foreign_keys=[class_id])  # Each User is associated with one Class


class Class(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    subject = db.Column(db.String(255), nullable=False)
    teacher = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    class_time = db.Column(db.String(128), nullable=False)
    total_sessions = db.Column(db.Integer, nullable=False)

    # Define the relationship to the User table (teacher is a User)
    teacher_user = relationship('User', backref='teaching_classes', foreign_keys=[teacher])

    # Define the relationship to Attendance (each Class has many Attendances)
    attendances = relationship('Attendance', backref='class_')


class Attendance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student = db.Column(db.String(128), ForeignKey('user.id'), nullable=False)  # Should reference User.id, not class_id
    class_ref = db.Column(db.Integer, ForeignKey('class.id'), nullable=False)  # Should reference Class.id (integer)
    date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(128), nullable=False)
    remarks = db.Column(db.String(255), nullable=False)

    # Define the relationship to User (each Attendance belongs to one User)
    student_user = relationship('User', backref='attendance')


class AttendanceReport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    class_ref = db.Column(db.Integer, ForeignKey('class.id'), nullable=False)  # Should reference Class.id (integer)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    total_classes = db.Column(db.Integer, nullable=False)
    total_attended = db.Column(db.Integer, nullable=False)
    attendance_percentage = db.Column(db.Integer, nullable=False)

    # Define the relationship to User (AttendanceReport is for a User)
    user_info = relationship('User', backref='attendance_report')

    # Define the relationship to Class (AttendanceReport is for a Class)
    class_info = relationship('Class', backref='attendance_report')


class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)  # Should reference User.id (integer)
    message = db.Column(db.String(255), nullable=False)
    notification_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(128), nullable=False)

    # Define the relationship to User (each Notification is for a User)
    user_info = relationship('User', backref='notification')


class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)
