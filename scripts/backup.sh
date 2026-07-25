#!/usr/bin/env bash
# Backup de la base Supabase Loukman Immobilier
# Usage: bash scripts/backup.sh

set -e

DATE=$(date +%Y-%m-%d_%H%M%S)
BACKUP_DIR="backups"
mkdir -p "$BACKUP_DIR"

DB_URL="postgresql://postgres.rtrskedyeayuytfbkcrd:Papa%20jesus1%262@aws-1-eu-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true"

echo "⏳ Backup en cours..."
pg_dump --no-owner --clean "$DB_URL" > "$BACKUP_DIR/loukman-$DATE.sql"

echo "✅ Backup créé : $BACKUP_DIR/loukman-$DATE.sql"
echo "   Taille : $(du -h "$BACKUP_DIR/loukman-$DATE.sql" | cut -f1)"
