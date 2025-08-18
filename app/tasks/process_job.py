from datetime import datetime
from app.celery import celery
from app.models.job import Job
from app import db

@celery.task(name="tasks.process_job")
def process_job(job_id: int):
    # Use a raw connection to avoid app context requirements in Celery
    # but SQLAlchemy session is fine when we set up the app context below.
    from app import create_app
    app = create_app()

    with app.app_context():
        job = db.session.get(Job, job_id)
        job.processed_at = datetime.now()
        db.session.commit()
        return job
