#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "=== 9 to 5: Survive - Supabase community setup ==="
echo ""

if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "Created .env from .env.example"
fi

if ! command -v npx >/dev/null 2>&1; then
  echo "npx is required. Install Node.js first."
  exit 1
fi

echo "Step 1: Log in to Supabase (browser opens)"
echo "  npx supabase login"
npx supabase login

echo ""
echo "Step 2: Create a cloud project (pick your org, region, strong DB password)"
echo "  Example: npx supabase projects create nine-to-five-survive --org-id YOUR_ORG_ID --db-password 'YOUR_STRONG_PASSWORD' --region us-east-1"
echo ""
read -r -p "Enter your new project REF ID (from dashboard URL): " PROJECT_REF

if [[ -z "${PROJECT_REF}" ]]; then
  echo "Project ref is required."
  exit 1
fi

echo ""
echo "Step 3: Link this repo to the project"
npx supabase link --project-ref "${PROJECT_REF}"

echo ""
echo "Step 4: Push database schema (leaderboard + ideas)"
npx supabase db push

echo ""
echo "Step 5: Fetch API keys into .env"
API_URL="https://${PROJECT_REF}.supabase.co"
ANON_KEY="$(npx supabase projects api-keys --project-ref "${PROJECT_REF}" -o json | node -e "
  let s='';process.stdin.on('data',d=>s+=d);process.stdin.on('end',()=>{
    const j=JSON.parse(s);
    const row=j.find(k=>k.name==='anon')||j.find(k=>k.name==='anon public');
    console.log(row?row.api_key:'');
  });
")"

if [[ -z "${ANON_KEY}" ]]; then
  echo "Could not auto-fetch anon key. Paste it manually from:"
  echo "  Supabase Dashboard → Project Settings → API → anon public"
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
echo "Verify in Supabase Table Editor:"
echo "  - public.players"
echo "  - public.scenario_ideas"
