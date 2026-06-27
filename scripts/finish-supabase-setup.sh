#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PROJECT_REF="${1:-}"
if [[ -z "${PROJECT_REF}" ]]; then
  read -r -p "Project REF (from dashboard URL): " PROJECT_REF
fi

if [[ -z "${PROJECT_REF}" ]]; then
  echo "Project ref is required."
  exit 1
fi

echo "=== Linking project ${PROJECT_REF} ==="
npx supabase link --project-ref "${PROJECT_REF}"

echo ""
echo "=== Pushing database schema ==="
npx supabase db push

echo ""
echo "=== Writing .env ==="
API_URL="https://${PROJECT_REF}.supabase.co"
ANON_KEY="$(npx supabase projects api-keys --project-ref "${PROJECT_REF}" -o json | node -e "
  let s='';process.stdin.on('data',d=>s+=d);process.stdin.on('end',()=>{
    const j=JSON.parse(s);
    const row=j.find(k=>k.name==='anon')||j.find(k=>k.name==='anon public');
    console.log(row?row.api_key:'');
  });
")"

if [[ -z "${ANON_KEY}" ]]; then
  echo "Could not auto-fetch anon key. Paste from:"
  echo "  Dashboard → Project Settings → API → anon public"
  read -r -p "Anon key: " ANON_KEY
fi

cat > .env <<EOF
EXPO_PUBLIC_SUPABASE_URL=${API_URL}
EXPO_PUBLIC_SUPABASE_ANON_KEY=${ANON_KEY}
EOF

echo ""
echo "Done. Restart Expo:"
echo "  npm start"
echo ""
echo "Home screen should show: Community live"
