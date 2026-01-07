from flask import Blueprint

api_bp = Blueprint("api", __name__, url_prefix="/api")

from .health import *
from .test import *
