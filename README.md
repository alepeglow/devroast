# devroast

`devroast` is a playful web app where you paste code and get a brutally honest roast back.

This project is being built during **NLW by Rocketseat**, following the lessons from the event.

## What the app does

- lets you paste a code snippet into a terminal-style input area
- offers a roast mode for a more sarcastic experience
- shows a leaderboard with the most questionable code snippets
- presents code in a polished editor-like interface
- uses a custom visual system inspired by the event design

## Current status

Right now the project already has:

- a homepage based on the selected Pencil design
- a reusable UI library with buttons, toggles, badges, code blocks, score rings, cards, and more
- a reusable leaderboard section built with compound components
- static data for the interface, with no API integration yet

## Why this exists

The idea behind `devroast` is to make code review feel fun, visual, and memorable instead of dry and mechanical.

## Next steps

- connect the UI to a real backend/API
- submit code and receive generated roast feedback
- expand the leaderboard into its own page
- build the next screens from the design

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.
