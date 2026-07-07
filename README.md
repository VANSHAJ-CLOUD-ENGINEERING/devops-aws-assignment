# DevOps AWS Assignment

This is my submission for the DevOps assignment. It's a simple Node.js app
deployed on an AWS EC2 instance, with a basic CI/CD pipeline, monitoring,
and load testing.

## What's in this repo

- `app/` - the Node.js (Express) application
- `.github/workflows/deploy.yml` - GitHub Actions pipeline that deploys to EC2
- `k6-test.js` - simple load test script
- `architecture.png` - architecture diagram
- `SECURITY.md` - security notes
- `report.pdf` - final report

## How I set it up

### 1. EC2 instance

- Launched a `t2.micro` EC2 instance (Free Tier) with Amazon Linux.
- Created a key pair and downloaded the `.pem` file to SSH in.
- Opened ports 22 (SSH, only from my IP), 80 (HTTP), and 3000 (app) in the
  security group.

### 2. Installing the app on EC2

```bash
sudo yum update -y
sudo yum install -y nodejs npm git
sudo npm install -g pm2

git clone <my-repo-url> app
cd app/app
npm install

pm2 start ecosystem.config.js
pm2 save
```

### 3. S3 bucket

Created an S3 bucket to store backups of app logs. Made it private
(no public access) and turned on default encryption.

### 4. IAM

Created a small IAM role for the EC2 instance with permission to write to
CloudWatch Logs and to my S3 bucket only (not full admin access).

### 5. CI/CD (GitHub Actions)

Every time I push to `main`, the workflow in
`.github/workflows/deploy.yml` runs. It installs dependencies and then
SSHs into the EC2 instance to pull the latest code and restart the app
with PM2.

GitHub repo secrets used:
- `EC2_HOST` - EC2 public IP
- `EC2_USER` - ec2-user
- `EC2_SSH_KEY` - the private key content

### 6. HTTPS

I tried to set up HTTPS using NGINX + Certbot in front of the app, since a
free domain/subdomain was needed for Let's Encrypt. This step is optional
depending on whether a domain is available.

### 7. Monitoring (CloudWatch)

- Installed the CloudWatch Agent on the EC2 instance to send basic logs.
- Created a simple CloudWatch dashboard with CPU usage and status checks.
- Added an alarm that emails me if CPU usage goes above 80%.

### 8. Load Testing (k6)

Ran a simple load test using k6 with 20 virtual users for 30 seconds:

```bash
k6 run -e BASE_URL=http://<ec2-ip> k6-test.js
```

Recorded from the k6 output and CloudWatch during the test:
- Average response time
- Requests per second
- Error rate
- CPU usage from CloudWatch

(See `report.pdf` for the actual numbers from my test run.)

## What I'd improve with more time

- Use HTTPS properly with a real domain.
- Use SSM Session Manager instead of SSH so I don't have to keep port 22 open.
- Add auto scaling so the app can handle more traffic.
- Add more automated tests before deployment.
