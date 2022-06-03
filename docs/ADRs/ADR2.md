# ADR 2 - Testing

## Context

Testing is conducted to ensure code is working correctly and as desired. It is necessary to be creative when conducting front-end tests.

## Decicions
- Unit testing is conducted on modules with exported functions
- The supertest framework is used to conduct testing on API's
- API's are tested for the following things:
    - A connection is established
    - The correct variable is returned
    - The correct sized variable is returned 
    - The correct variable type is returned
    - The necessary contents are returned
- The database is tested in the following way:
    - A mock database is set up in the form of an array of objects which represent the database. These objects have variables which correspond to the database table columns.
    - Although the exact SQL commands cannot be used, the functionality is tested in how the database should act in different situations.

## Status
Accepted

## Consequences

The developers know that the code is acting how they would like it to.
