from datetime import datetime
from app import db

class Job(db.Model):
    __tablename__ = "jobs"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    name = db.Column(db.String, nullable=False)
    processed_at = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return f"<Job id={self.id}>"