#!/usr/bin/env bash
# exit on error
set -o errexit

# Update and install system dependencies
apt-get update && apt-get install -y build-essential libpq-dev

# Install Python dependencies
pip install -r requirements.txt