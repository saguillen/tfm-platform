#!/bin/sh
set -e

echo "Backstage backend starting..."
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

echo ""
echo "Packages directory:"
ls -la packages/ || echo "packages directory not found"

echo ""
echo "Backend package contents:"
ls -la packages/backend/ || echo "packages/backend directory not found"

echo ""
echo "Backend src contents:"
ls -la packages/backend/src/ || echo "packages/backend/src directory not found"

echo ""
echo "Starting backend..."
exec node -r tsx packages/backend/src/index.ts
