# ADR 5 - File Structure

## Context
 The file structure of the application loosely follows the Model View Controller (MVC) structure.

## Decisions
- The static files such as CSS and bootstrap are stored in src/public/css folder which represents the contents folder.
- All html files are stored in the src/views/class folder.
- All the client-side js files corresponding to the html files are stored in the src/public/scripts folder, this represents the controller. 
- Server side files are found in the root of the src directory, this represents the model.

## Status
Accepted

## Consequences
All client side scripts code can be accessed from the browser and are easily located.