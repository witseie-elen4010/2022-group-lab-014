# ADR 4 - API's

## Context
API's are a way of communicating between web pages. Client side javascript files cannot access the server side files and therefore communicate through API calls.

## Decisions
- A RESTful API interface is used.
- The answer word as well as all valid words are stored in an API.
- When the user logs in, their username is posted in an API and is then communicated with the database. Once the user details are received, the database returns the current player's details and stores it in an API.
- There is an API to store the game code and game mode to ensure the correct players enter a lobby and are directed to play the correct game mode.
- The players in a multiplayer game have their names stored in an API in order to know which players are playing at a given time.
- All calls to update the database are made through an API.
- When a player updates the colours of their board, the new colours are sent to an API in order for the opponent to be ble to update the opponent board on their screen.
- Logs of moves for multiplayer are stored in an API for the users to see the logs of all player's moves at the end of a game.

## Status
Accepted

## Consequences
There is easy communication between client and server.
