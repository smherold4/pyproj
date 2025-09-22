from datetime import datetime
from flask import Blueprint, redirect, url_for, render_template, request, flash
from app.models.job import Job
from app import db
from app.tasks import process_job

bp = Blueprint("routes", __name__)

@bp.route("/")
def root():
    return redirect(url_for("routes.go"))

@bp.route("/go", methods=["GET", "POST"])
def go():
    if request.method == "POST":
        job = Job(created_at=datetime.now())
        db.session.add(job)
        db.session.commit()
        process_job.delay(job.id)
        flash("Enqueued job {}".format(job.id))
        return redirect(url_for("routes.go"))
    return render_template("go.html")

@bp.route("/check")
def check():
    count = db.session.query(Job).count()
    count_processed = db.session.query(Job).filter(Job.processed_at.isnot(None)).count()
    return render_template("check.html", count=count, count_processed=count_processed)
