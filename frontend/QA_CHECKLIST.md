# QA Checklist for Weekly Challenges Feature

Follow these steps when verifying the weekly challenges feature for production readiness:

1. Start the backend server and ensure API is reachable at `http://localhost:5000/api`.
2. Ensure admin user exists; if not, create a user and manually set `isAdmin: true` in the DB.
3. Start the frontend:
   ```powershell
   cd frontend
   npm ci
   npm run dev
   ```
4. Confirm Weekly Page Behavior:
   - Load `/challenges` as a non-admin (or guest). The page should show a generated weekly plan fallback if server returns empty.
   - As a non-admin, the "Publish Plan" button should not be visible. You can still claim locally generated tasks and use the Claim Weekly Bonus button.
   - As an admin user (login and ensure `isAdmin = true`), the "Publish Plan" button should be visible for generated weekly plans.
   - Publishing should prompt for a confirmation, then send `POST /api/challenges/weekly/create` and update the UI to a server-backed plan.
   - After publishing, the generated plan should be removed from `localStorage` and weekly tasks now come from server API.
5. Claiming & Bulk Claim:
   - For server-backed weekly tasks: claim individual and bulk jobs should be authenticated and update leaderboard.
   - For client-generated weekly tasks: claiming should be local and persist to `localStorage`.
6. Verify CLI & Logs:
   - Backend logs show who published and claimed tasks.
7. CI / Tests:
   - Run `npm run lint` and `npm test` in the `frontend` folder.

If any behaviour is inconsistent, report back with the component ID and reproduction steps.
