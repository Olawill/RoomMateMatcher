# ROOMMATE MATCHER

The Roommate Matcher project is a user-friendly web application built for the Web Development React course. This application aims to help users find compatible roommates based on their preferences and lifestyle.

## Table of Contents
- [Setup](#Setup)
- [Backend](#Backend)
- [Frontend](#frontend)


### Setup

- #### Create Auth0 Account
  - Follow the [link](https://developer.auth0.com/resources/guides/spa/react/basic-authentication) to create Auth0 account for developers. Start at __Configure React with Auth0__.
- Get a Google Maps API key from [google](https://console.cloud.google.com)
  - Create a free account
  - Click the donut on the top left
  - Click on the Google Maps Platform
  - Select keys & Credentials to create an API key
  - Restrict the API key as needed
- Now fork/clone the github repo [here](https://github.com/Olawill/RoomMateMatcher)!

### Frontend
1. Navigate to the /frontend directory in your terminal.
    ```sh
    cd frontend
    ```
2. Create a .env file in the frontend directory
    ```sh
    VITE_GOOGLE_MAPS_API="GOOGLE MAPS API KEY"

    VITE_AUTH0_DOMAIN="AUTH0 DOMAIN"
    VITE_AUTH0_CLIENT_ID="AUTH0 CLIENT ID"
    VITE_AUTH0_CALLBACK_URL="AUTH0 CALLBACK URL"
    ```
2. Install dependencies
    ```sh
    npm install
    ```
3. Start the development server
    ```sh
    npm run dev
    ```
4. Open your web browser and navigate to ```http://localhost:5173``` to view the application.

### Backend

1. On another terminal, navigate to the /backend directory in your terminal.
    ```sh
    cd backend
    ```
2. Install dependencies
    ```sh
    npm install
    ```
3. Start the development server
    ```sh
    npm start
    ```
4. Backend Server run on ```http://localhost:8003```

For more information on how to set up the backend, please refer to the [backend/readme](/backend/README.md) file.
