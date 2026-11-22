# StudentPlannerV2

A React Native (Expo) study planner. Tasks have a subject, priority, deadline, notes, a steps checklist and a focus timer.

## What is new in V2

- Tasks tab: Overdue / Due today / Done this week tiles, overall progress bar, filter chips, sort by deadline or priority
- Smart deadline badges ("Overdue by 2 days", "Due today", "Due in 3 days")
- Task details: Mark as done, Steps checklist, Focus timer that logs study minutes to the task
- Add / Edit Task: one-tap subject chips and quick deadline buttons
- Completed tab: Study insights (7-day study chart, streak, per-subject summary), completion date, score and study time
- 7-day week strip on the Tasks tab, study streak, task types (Assignment / Quiz / Exam / Project / Reading)
- Repeating tasks (Daily / Weekly), time-needed estimate, and a score per finished task (average per subject)
- Daily motivational quote on the Tasks tab, powered by the free ZenQuotes API

## Daily quote (ZenQuotes API)

The Tasks tab shows a new motivational quote each day.

- Source: [ZenQuotes](https://zenquotes.io) (`https://zenquotes.io/api/random`)
- No API key is needed, so there is nothing to set up or hide
- The quote is saved on the device, so the app only calls the API once a day
- If you are offline or the API fails, a default quote is shown instead
- ZenQuotes requires credit, so the "Quotes by ZenQuotes.io" line under the quote must stay
- Note: browsers block this API, so the web preview (`npm run web`) shows the default quote. Use Expo Go on a phone to see real quotes.

## Get started

```bash
npm install
npm start
```

Scan the QR code with **Expo Go** (iOS / Android), or press `w` for a browser preview.

If Expo asks you to update packages and `npm install` fails with a peer dependency error, run:

```bash
npx expo install --fix -- --legacy-peer-deps
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Start the Expo dev server |
| `npm run android` / `npm run ios` | Open on a device or emulator |
| `npm run web` | Run in the browser |
| `npm run typecheck` | Type-check the project |

## Project structure

- `app/` - Expo Router route files. Each one re-exports a screen from `src`, so the folder must stay in the project root.
- `src/tasks/` - Tasks screen, task details, and the daily quote card (`quote-card.js`)
- `src/add-task/` - Add and edit task screens and form fields
- `src/completed/` - Completed tab and study insights
- `src/shared/` - App state, styles, icons, tabs, and storage

If the app only shows "This is the first page of your app", the `app/` folder is missing.

## Building for the stores

Use [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
npx eas-cli build --platform android   # or ios
```

See `AGENTS.md` for project structure and conventions.
