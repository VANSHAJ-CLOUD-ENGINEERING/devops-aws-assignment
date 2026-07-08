#!/bin/bash

DATE=$(date +"%Y-%m-%d-%H-%M-%S")

BACKUP_NAME=backup-$DATE.tar.gz

tar -czf $BACKUP_NAME ~/devops-aws-assignment

aws s3 cp $BACKUP_NAME s3://vanshaj-devops-assignment-backup/backups/

echo "Backup uploaded: $BACKUP_NAME"
