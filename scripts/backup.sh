#!/usr/bin/env bash
# Backup de la base Supabase Loukman Immobilier
# Usage: bash scripts/backup.sh

set -e

DATE=$(date +%Y-%m-%d_%H%M%S)
BACKUP_DIR="backups"
mkdir -p "$BACKUP_DIR"

DB_URL="${DATABASE_URL:-}"
if [ -z "$DB_URL" ]; then
  echo "❌ DATABASE_URL manquant." >&2
  echo "   Exporte-la avant de lancer :  DATABASE_URL=\"...\" bash scripts/backup.sh" >&2
  exit 1
fi

echo "⏳ Backup en cours..."
pg_dump --no-owner --clean "$DB_URL" > "$BACKUP_DIR/loukman-$DATE.sql"

echo "✅ Backup créé : $BACKUP_DIR/loukman-$DATE.sql"
echo "   Taille : $(du -h "$BACKUP_DIR/loukman-$DATE.sql" | cut -f1)"
