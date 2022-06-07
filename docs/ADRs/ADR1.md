# ADR 1- Database

## Context
 Environment variables must be used so that developers' information (usernames and passwords) is not leaked on GitHub.

## Decisions
- The Azure database is a SQL database which has been chosen for the architecture of this application. It can be monitored on the developer's Azure portals.
- The database consists of the following columns:
    - username
    - games_played
    - games_won
- The user who is currently playing a game has their information stored in an API.

## Status
Accepted

## Consequences
User's details are stored safely in the database so that other users cannot access their details. This also enables the user streaks to be monitored accurately.

