#!/usr/bin/env bash
# exit on error
set -o errexit

# 1. UPGRADE THE BUILD TOOLS (This is the new line that fixes the error)
pip install --upgrade pip setuptools wheel

# 2. INSTALL SYSTEM DEPENDENCIES (Keep this from before)
apt-get update && apt-get install -y build-essential

# 3. INSTALL YOUR PACKAGES
pip install -r requirements.txt