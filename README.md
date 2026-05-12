# Hackathon Frontend

React frontend for checking air quality by city. The app lets a user search for a city, shows the current air quality details, saves the result through the backend API, and displays the latest historical searches stored in the database.

## What The App Does

- Lets the user enter a city name.
- Calls the Node backend to request air quality data.
- Shows the AQI, health risk, and pollutant values for the selected city.
- Saves the searched result in the backend database.
- Loads and displays the last 10 saved searches.
- Includes an optional AQI guide that explains each air quality level.

## Tech Stack

- React
- Mantine UI
- Axios

## Backend Dependency

This frontend expects the backend API to be running. By default, the API URL is configured as:

```env
REACT_APP_API_URL=http://localhost:3003
```

The backend should expose these endpoints:

```text
GET  /api/air-quality?city=<city>
POST /api/air-quality
GET  /api/air-quality-historical
```

## Environment Variables

Create or update `.env` in the project root:

```env
REACT_APP_API_URL=http://localhost:3003
```

Important: in Create React App, frontend environment variables must start with `REACT_APP_`.

After changing `.env`, restart the development server.

## Installation

```bash
npm install
```

## Run The App

```bash
npm start
```

## User Flow

1. User types a city.
2. Frontend calls `GET /api/air-quality?city=<city>`.
3. Backend consults the external air quality provider.
4. Frontend shows the returned result.
5. Frontend sends the formatted result to `POST /api/air-quality`.
6. Backend stores the result in MySQL.
7. Frontend refreshes `GET /api/air-quality-historical`.
8. The historical table shows the latest saved searches.
