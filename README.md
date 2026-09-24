# Fantasy Command Center

Mobile-first ESPN fantasy football decision center for league **1353535746**.

## Features
- ESPN roster/settings/matchup sync adapter
- Safe / Balanced lineup
- Risk / High Payoff lineup
- Strong Predictions lineup
- Waiver, trade, matchup and report workspaces
- PWA manifest for Home Screen installation

## Private ESPN league setup
Set these only as server environment variables. Never commit them:
- `ESPN_S2`
- `ESPN_SWID`

The app targets ESPN's current v3 fantasy read host. ESPN's fantasy API is unofficial and can change.

## Run
```
npm install
npm run dev
```

## Deploy
Import this repository into a Next.js-compatible host and add the two environment variables there for private-league sync.
