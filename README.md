# Lively

The React front end for Lively, a fitness web app that builds a weekly workout plan with AI and keeps people coming back with XP, levels, achievements and an avatar you unlock as you go.

Lively was a four-person team project for the Software Engineering course in my MS in Computer Science at Boston University (Spring 2026). I owned the front end, which is what's in this repo. The Spring Boot backend was built by the team (I helped out on it too) and lives in the private course repo.

## What I built

- React + TypeScript setup with CSS modules, React Router and an auth context
- Converted the original HTML landing page to TypeScript and built the Learn More page
- Monthly calendar that loads workout plans from the API, with a month picker and the date logic behind it
- Workout detail modal with a circular timer, plus the dashboard and persistent sidebar
- XP and level system (100 XP per level) and achievements tied to backend data
- Customizable SVG avatar with colour options and XP-locked unlocks

## How the app works

1. The questionnaire collects goals, experience, biometrics and weekly availability.
2. The backend turns the answers into a prompt for AWS Bedrock, adds exercise details from API Ninjas and a YouTube demo for each exercise, and saves the plan.
3. The dashboard shows the plan on a calendar. Finishing a workout awards XP, levels you up and unlocks achievements and avatar items.

## Stack

- React 19, TypeScript, Vite
- React Router, CSS modules
- Jest, React Testing Library

## Running it

```bash
npm install
npm run dev     # http://localhost:5173
npm test
```

The app calls a REST API under `/api` (users, workouts, achievements, AI plan generation), so most pages need the backend running to show real data.
