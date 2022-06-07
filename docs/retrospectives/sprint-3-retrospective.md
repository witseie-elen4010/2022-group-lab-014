# Sprint 3 Retrospective
## Results
### User-related Criteria
- A single player can access a log of all actions made during the game.
- Players can play both multiplayer game modes: they can set their own guess word OR can use the ranomly generated one.
- A player can create a new multiplayer game where other players can join with a specific game code.
- Players are redirected to a waiting room where they can see their opponents' names before starting the game. 
- Players can see live updates of their opponents' game progress via the colour-coded grids.
- Players can play the multiplayer game and are notified if they have won or lost.
- A player can enter the word to be guessed by other players and can observe their grids as game host.
- All players in multiplayer games can see a log of all actions made during the game.
- All webpages have been formatted consistently to enhance the overall user experience.
- User details (name, number of games played, number of wins, streak) are remembered between games.
- Players can use their keyboard to play the game
- A new answer word is generated once per day

### Developer-related Criteria
- Multiple players can play on the website simultaneously. 
- The players are redirected to the correct screen depending on the game mode.
- The player's username is stored in local storage, along with a database.
- APIs were created and used in the following instances:
    - The user-selected word to be guessed is stored in an API and fetched for the other players.
    - The randomly generated word to be guessed is stored in an API and fetched for the other players.
    - The game code to join a multiplayer game is stored in an API.
    - The list of players playing the same multiplayer game is stored in an API.
    - The logs for both the single and multiplayer games are stored in an API.

- The following is stored in a SQL table in the database:
    - All users who have played the game along with the amount of games they have played and won.
- Jest and Supertest frameworks have been used to test back-end functionality. Specifically, the following testing has been implemented:
    - All APIs are able to retrieve necessary data.
    - The database was tested by creating mock entries.


### Stories
- 11 user stories were allocated at the beginning of Sprint 3.
- 2 user stories were added during Sprint 3.
- 1 developer story was allocated for Sprint 3.

- All of the 11 initially allocated stories have been completed.

- 1 bug related to colour-coding on the grid and keyboard was fixed.

- The sum total of points allocated to the stories is: 21

        Estimated velocity = 21 points/sprint 
        Actual velocity = 24 points/sprint 

### Successes
-  All group members were able to complete at least one user story.
- This sprint has achieved a minimum viable product through the addition of both mutliplayer game modes. 
-  There was consistent and clear communication between group members, where everyone was able to report back on which stories had been completed.
- Merge conflicts were mostly avoided (or easily mitigated) using the techniques reccommended in the Sprint 1 retrospective.
- The majority of user stories represent verticle slices by integrating APIs, the database, logic and UI layers.

### Failures & Recommendations for Future
- Front-end testing has been fully ommitted from the final project code.
- Code is largely uncommented, making the code unreadable and difficult to follow. 
- Variables and HTML elements have not followed correct naming conventions, contributing to poor comprehension in the code.