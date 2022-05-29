# Sprint 2 Retrospective
## Results
### User-related Criteria
- Players can log into their accounts
- Players can see their guessed words, and letters on the grid and keyboard are colour-coded 
    according to their correctness.
- Players can play the game and are notified if they have won or lost.
- Players can see how many games they have played; how many games they have lost/won.
- Players can see their current streak (how many consecutive games they have played).

### Developer-related Criteria
- Player details are stored on a database on Azure to be able to keep track of players current scores.
- The word to be guessed/ answer word changes every game.
- Supertest and Jest frameworks have been used to test back-end functionality. Specifically, the following has been tested:
    - The answer API retrieves the correct word from the answer dictionary.
    - The valid words API retrieves all valid words from the dictionary.
    - A user is added to the database with game-play variables set to 0, after login, if their profile does not exist.
    - A user is returned from the database if their profile exists with the corresponding game-play variables.


### Stories
- 9 user stories were allocated for Sprint 2.
- 1 developer story was allocated for Sprint 2.

- All of the 10 stories have been completed.

- 1 bug related to colour-coding on the grid and keyboard was fixed.

- 2 stories have been removed from Sprint 2 due to redundancy.

- The sum total of points allocated to the stories is: 17

        Estimated velocity = 17 points/sprint 
        Actual velocity = 15 points/sprint 

### Successes
-  All group members were able to complete either at least one developer-sized story or one user story.
- This sprint has achieved a minimum viable product through the single player game. 
-  There was consistent and clear communication between group members, where everyone was able to report back on which stories had been completed.
- Merge conflicts were successfuly avoided using the techniques reccommended in the Sprint 1 retrospective.

### Failures & Areas for Improvement
- While higher test coverage has been implemented, it is still not sufficient. Front-end testing should be included in Sprint 3.
- Code is largely uncommented. This should be rectified in Sprint 3.
- Code needs to be cleaned up with the use of functions, fewer nested loops.
- Team members have not been strict enough with the reviewing of pull requests. Reviews should include a higher level of input/ suggestion before merging. 