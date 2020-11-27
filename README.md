# Stombla-Solar-System-Shipping-Company-API

In the distant future, humans have colonised all planets in our solar system. Stomble, a shipping company trying to expand their operations to the whole solar system. This project is an API for Stomble to use with their interplanetary travels, developed to manage the logistics of Stomble's fleet of spaceships.

## Technologies

This project uses:

- Typescript
- Serverless

## Endpoints

| HTTP Method | Path                             | Description                                                     | Required JSON                                                                                                           |
| ----------- | -------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| post        | /locations/{locationID}          | Adds a location                                                 | {id: string, cityName: string, planetName: string, totalAvailableCapacity: number, currentAmountOfCapacityUsed: number} |
| delete      | /loations/{locationID}           | Removes a location                                              | {id: string}                                                                                                            |
| get         | /locations/help                  | Displays information about locatin APIs                         | NULL                                                                                                                    |
| post        | /spaceships/{spaceshipID}        | Adds a spaceship                                                | {id: string, name: string, model: string, locationID: string, status: string}                                           |
| put         | /spaceships/status/{spaceshipID} | Updates a spaceship's status                                    | {id: string, newStatus: string}                                                                                         |
| delete      | /spaceships/{spaceshipID}        | Removes a spaceship                                             | {id: string}                                                                                                            |
| get         | /spaceships/help                 | Displays information about spaceship's APIs                     | NULL                                                                                                                    |
| put         | /travel                          | Updates infomation for a spaceship to travel to new destination | {spaceshipID: string, distinationID: string}                                                                            |
| get         | /travel/help                     | Displays information about travel's APIs                        | NULL                                                                                                                    |

## Backlog

- [x] API Endpoints
  - [x] Add spaceship endpoint
  - [x] Add location endpoint
  - [x] Update Spaceship endpoint
  - [x] Remove Spaceship endpoint
  - [x] Remove location endpoint
  - [x] travel functionality endpoint
- [x] Services
  - [x] Add spaceship service functionalty
  - [x] Add location service functionalty
  - [x] Update Spaceship service functionalty
  - [x] Remove Spaceship service functionalty
  - [x] Remove location service functionalty
  - [x] travel functionality service functionalty
- [ ] Database
  - [x] Create adding spaceship link
  - [x] Create adding location link
  - [x] Create updating spaceship link
  - [x] Create removing spaceship link
  - [x] Create removing spaceship link
  - [x] Create travel functionaly link
  - [ ] Set up an actual database
- [x] Testing
  - [x] Add spaceship
  - [x] Add location
  - [x] Update Spaceship
  - [x] Remove Spaceship
  - [x] Remove location
  - [x] travel functionality
