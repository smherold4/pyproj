from app.routes import api_bp


@api_bp.route("/health", methods=["GET"])
def health():
    return {"status": "ok"}
