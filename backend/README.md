# Backend - FinanceYatra

This directory contains the Node.js Express backend for FinanceYatra.

## Weekly Challenges Notes
- The route `POST /api/challenges/weekly/create` now requires authentication and an admin user. To enable this route, set the `isAdmin` flag on a user document in MongoDB.
- The route validates incoming payloads and saves the weekly challenges to `src/data/weekly_store.json` using an atomic write operation to avoid partial writes.
 - The application now uses a MongoDB collection named `WeeklyChallenge` as the source-of-truth for weekly challenges. The JSON file under `src/data/weekly_store.json` is maintained as a fallback and for backward compatibility.
 - To migrate existing weekly challenges from `weekly_store.json` to the database, run:
	 ```powershell
	 cd backend
	 npm ci
	 npm run migrate:weekly
	 ```
	 The script is idempotent (skips existing weekIds).
- Claim routes `POST /api/challenges/weekly/claim` require authentication.

## Security
- Helmet and rate-limiting are enabled.
- Inputs are sanitized and validated using `express-validator`.

## Running
Use the same scripts as before:
```
cd backend
npm install
npm run dev
```
> Tip: If you used `npm ci` or `npm install` after pulling changes, any missing dependencies (like `helmet`, `express-rate-limit`, `express-validator`) will be installed. If you are running a simple `node` command and see a module-not-found error, run `npm ci` first.
