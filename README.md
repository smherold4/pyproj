Python version: set in .python-version

Lock: pip-compile --allow-unsafe --generate-hashes

Install: pip install --require-hashes -r requirements.txt

Update deps: edit requirements.in → run pip-compile again → commit updated requirements.txt