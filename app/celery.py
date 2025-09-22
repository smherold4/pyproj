import os
from celery import Celery

def make_celery():
    broker_url = os.getenv("CELERY_BROKER_URL", "")

    # Optional SQS tuning if you use SQS in AWS:
    # For SQS: set CELERY_BROKER_URL=sqs:// and provide AWS creds via task role or env.
    # Celery auto-discovers region/creds when running in ECS with a task role.
    app = Celery("pyproj", broker=broker_url)
    # No result backend needed for this toy.

    app.conf.task_acks_late = False
    app.conf.worker_concurrency = int(os.getenv("WORKER_CONCURRENCY", "1"))
    return app

tasks_app = make_celery()
