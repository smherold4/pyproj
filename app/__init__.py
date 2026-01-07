from dotenv import load_dotenv
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Load environment variables from .env file
load_dotenv()

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.secret_key = os.getenv("SECRET_KEY", "dev-secret")

    migrate = Migrate(app, db)
    db.init_app(app)
    migrate.init_app(app, db)

    from app.routes import api_bp

    app.register_blueprint(api_bp)

    return app
