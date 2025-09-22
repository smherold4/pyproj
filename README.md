Python version: set in .python-version

Lock: pip-compile --allow-unsafe --generate-hashes > requirements.txt

Install: pip-sync

Update deps:

1. edit requirements.in
2. run pip-compile command above
3. pip-sync
4. commit updated requirements.txt

Celery: celery -A app.celery worker -l info
Flower: celery -A app.celery flower
