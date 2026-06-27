# 9 to 5: Survive

A decision-based RPG about navigating office life, managing energy and sanity, and working toward a raise. Built with React Native (Expo).

## Quick Start

```bash
npm install
npm start        # Expo dev server (web / iOS / Android)
npm run preflight  # typecheck + unit tests (run before shipping)
```

Community features (leaderboard + scenario ideas + likes):

```bash
npm run db:setup   # one-time Supabase link
npm run db:push    # apply migrations (required for likes sort)
# add EXPO_PUBLIC_SUPABASE_URL + EXPO_PUBLIC_SUPABASE_ANON_KEY to .env
```

## Game Overview

You're an office worker trying to survive **5 workdays** and earn a raise. Each day: walk to the scenario spot, make a yes/no decision, live with weighted outcomes.

### Mechanics

- **Energy**: depletes from overwork
- **Sanity**: depletes from toxic interactions
- **Performance**: shown in the HUD; affects grades
- **Raise progress**: reach **25** to win
- **Office climates**: daily moods nudge scenario odds (34 climates, memory across runs)
- **31 scenarios**: fresh content prioritized until the pool cycles

### Retention

- Daily **streak** + perks vault (streak freeze is the only mechanical perk)
- **Leaderboard** + **scenario ideas** board via Supabase
- Run summary on every exit (including early burnout)

### Audio

Background chill music: *Carefree* by Kevin MacLeod (CC BY 4.0). Toggle on Home → **Music on/off**. See `assets/audio/ATTRIBUTION.txt` and in-app **About**.

## Tech Stack

- React Native (Expo) + TypeScript
- React Navigation (Stack)
- React Context + useReducer
- AsyncStorage (local progress, streak, scenario/mood memory)
- Supabase (optional community cloud)

---

## Shipping checklist

### Done in the app

- Error boundary with recovery screen
- About / privacy / music credits screen
- Production-friendly copy (no dev commands shown to players)
- `eas.json` for store builds
- Bundle IDs: `com.ninetofive.survive` (iOS + Android)
- Content + balance audit tests (`npm test`)

### Before App Store / Play Store

1. **Run preflight:** `npm run preflight`
2. **Set production Supabase** env in EAS secrets (`EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`)
3. **Run migrations:** `npm run db:push` against production project
4. **Create EAS project:** `npx eas init` then add `extra.eas.projectId` to `app.json`
5. **Build:** `npx eas build --platform all --profile production`
6. **Store assets:** screenshots, short description, age rating (likely 12+ for mild satire)
7. **Privacy URL:** host the About → Privacy text on a simple page and paste URL in store listing (required for apps that sync user-generated content)
8. **Test on real devices:** one full 5-day run, leaderboard, post/like an idea, music toggle, streak

### Recommended next (not blocking v1)

| Item | Why |
|------|-----|
| **Idea moderation** | Ideas are public; add Supabase dashboard review or a `hidden` flag + report flow |
| **Rate limits** | Edge function or DB trigger to cap posts/likes per badge per hour (anti-spam) |
| **Custom app icon** | Current icon is Expo default; swap before marketing push |
| **Sentry / crash reporting** | See real-world crashes beyond the error boundary |
| **Analytics** | Optional; understand retention without PII |
| **Outcome role flavor** | Only 8/124 outcome narratives are role-specific today |
| **App Store privacy nutrition labels** | Declare “User content” + “Gameplay data” if using leaderboard |

### Build commands

```bash
# Internal test build
npx eas build --platform ios --profile preview

# Store release
npx eas build --platform all --profile production
npx eas submit --platform ios
npx eas submit --platform android
```

### Environment notes

- `.env` is gitignored; use EAS Secrets for production builds
- Supabase **anon key** is safe in the client; protect with RLS (already enabled)
- Never ship the Supabase **service role** key in the app
