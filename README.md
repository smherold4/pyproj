## Python version: set in .python-version

## PYTYON COMMANDS
Lock: pip-compile --allow-unsafe --generate-hashes > requirements.txt

Install: pip-sync

## Create clean venv for local development

python -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install pip-tools

## Update deps:

1. edit requirements.in
2. run pip-compile command above
3. pip-sync
4. commit updated requirements.txt

Celery: celery -A app.celery worker -l info
Flower: celery -A app.celery flower

## Jumpbox
ssh -i ~/Desktop/ec2-rsa.pem ec2-user@18.188.141.97

## ECR
AWS_REGION=us-east-2
AWS_ECR_REPO=pyproj
AWS_ACCT_ID=$(aws sts get-caller-identity --query Account --output text)

ecrlogin="aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"
ecrbuild="docker build -t $AWS_ECR_REPO ."
ecrtag="docker tag $AWS_ECR_REPO:latest $AWS_ACCT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$AWS_ECR_REPO:latest"
ecrpush="docker push $AWS_ACCT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$AWS_ECR_REPO:latest"