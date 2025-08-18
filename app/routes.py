from flask import Blueprint, redirect, url_for, render_template, request, flash
from app.models.job import Job
from app import db
# from .tasks import insert_job

bp = Blueprint("routes", __name__)

@bp.route("/")
def root():
    return redirect(url_for("routes.go"))

@bp.route("/go", methods=["GET", "POST"])
def go():
    if request.method == "POST":
        # insert_job.delay()
        flash("Enqueued a job!")
        return redirect(url_for("routes.go"))
    return render_template("go.html")

@bp.route("/check")
def check():
    count = db.session.query(Job).count()
    return render_template("check.html", count=count)
