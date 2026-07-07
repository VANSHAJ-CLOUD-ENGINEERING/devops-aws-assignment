# Security Notes

## IAM

- Did not use the AWS root account for any of this.
- Created an IAM role for the EC2 instance instead of putting access keys
  on the server. The role only allows:
  - Writing logs to CloudWatch
  - Reading/writing to my one S3 bucket

## Security Group (Firewall) Rules

| Port | Type | Source | Why |
|------|------|--------|-----|
| 22   | SSH  | My IP only | So only I can SSH in |
| 80   | HTTP | Anywhere | For the website |
| 3000 | App  | Anywhere (or restrict later) | Node app port |

## S3

- Bucket is private (blocked all public access).
- Turned on default encryption.

## App

- No passwords or API keys are hardcoded in the code.
- GitHub secrets are used for the SSH key instead of committing it to the repo.

## Things I would improve

- Restrict port 3000 so it's only reachable through NGINX, not directly.
- Use HTTPS instead of plain HTTP.
- Rotate the SSH key once in a while.
- Use AWS Systems Manager instead of SSH so port 22 doesn't need to be open at all.
