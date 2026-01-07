from datetime import datetime
from app.models.job import Job
from app import db
from app.tasks import process_job
from app.routes import api_bp
from flask import request


@api_bp.route("/enqueue", methods=["POST"])
def enqueue():
    data = request.get_json() or {}
    job = Job(name=data.get("name"), created_at=datetime.now())

    db.session.add(job)
    db.session.commit()
    process_job.delay(job.id)
    return {"jobId": job.id}


@api_bp.route("/queue_counts", methods=["GET"])
def queue_counts():
    count = db.session.query(Job).count()
    count_processed = db.session.query(Job).filter(Job.processed_at.isnot(None)).count()
    return {
        "total": count,
        "processed": count_processed,
    }
