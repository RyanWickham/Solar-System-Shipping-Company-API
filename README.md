# Stombla-Solar-System-Shipping-Company-API

In the distant future, humans have colonised all planets in our solar system. Stomble, a shipping company trying to expand their operations to the whole solar system. This project is an API for Stomble to use with their interplanetary travels, developed to manage the logistics of Stomble's fleet of spaceships.

## Technologies

This project uses:

- Typescript
- Serverless

## Endpoints
HTTP Method | Path | Description | Required JSON
------------|------|-------------|---------------
post | /location | Adds a location | {id: string, cityName: string, planetName: string, totalAvailableCapacity: number, currentAmountOfCapacityUsed: number}
delete | /loation | Removes a location | {id: string}
get | /location/help | Displays information about locatin APIs | NULL
post | /spaceship | Adds a spaceship | {id: string, name: string, model: string, locationID: string, status: string}
put | /spaceship/status | Updates a spaceship's status | {id: string, newStatus: string}
delete | /spaceship | Removes a spaceship | {id: string}
get | /spaceship/help | Displays information about spaceship's APIs | NULL
put | /travel | Updates infomation for a spaceship to travel to new destination| {spaceshipID: string, distinationID: string}
get | /travel/help | Displays information about travel's APIs | NULL

## Backlog
- [x] API Endpoints
  - [x] Add spaceship endpoint
  - [x] Add location endpoint
  - [x] Update Spaceship endpoint
  - [x] Remove Spaceship endpoint
  - [x] Remove location endpoint
  - [x] travel functionality endpoint
- [ ] Services
  - [ ] Add spaceship service functionalty
  - [ ] Add location service functionalty
  - [ ] Update Spaceship service functionalty
  - [ ] Remove Spaceship service functionalty
  - [ ] Remove location service functionalty
  - [ ] travel functionality service functionalty
- [ ] Database
  - [ ] Create adding spaceship link
  - [ ] Create adding location link
  - [ ] Create updating spaceship link
  - [ ] Create removing spaceship link
  - [ ] Create removing spaceship link
  - [ ] Create travel functionaly link
