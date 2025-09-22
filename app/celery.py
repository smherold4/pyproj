import os
from celery import Celery

def make_celery():
    broker_url = os.getenv("CELERY_BROKER_URL", "")
    result_backend = os.getenv("CELERY_RESULT_BACKEND", "")

    app = Celery("pyproj", broker=broker_url, backend=result_backend)
    app.autodiscover_tasks(["app.tasks"])
    app.conf.task_acks_late = False
    app.conf.worker_concurrency = int(os.getenv("WORKER_CONCURRENCY", "1"))
    return app

tasks_app = make_celery()
