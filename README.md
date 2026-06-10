# 9 to 5: Survive

A decision-based RPG mobile game about navigating office life, managing your energy and sanity, and working toward a raise. Built with React Native (Expo).

## Quick Start

```bash
npm start        # Start Expo dev server
npm run ios      # Run on iOS simulator
```

## Game Overview

You're an office worker trying to survive the workday and earn a raise. Each of the 5 days presents a scenario requiring a yes/no decision. Choices have randomized consequences — sometimes saying yes is right, sometimes no. The goal is to reach the raise threshold without burning out.

### Mechanics

- **Energy** — depletes from overwork, replenishes from rest
- **Sanity** — depletes from toxic interactions, replenishes from boundaries
- **Performance** — affects raise progress
- **Raise Progress** — reach 50 to win

### Screens

1. Home / start screen
2. Daily scenario with decision prompt
3. Outcome with narrative and stat changes
4. End-of-day summary
5. Game Over (burnout)
6. Win (you got the raise!)

## Tech Stack

- React Native (Expo)
- TypeScript
- React Navigation (Stack)
- React Context + useReducer for state management
