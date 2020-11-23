# Stombla-Solar-System-Shipping-Company-API

In the distant future, humans have colonised all planets in our solar system. Stomble, a shipping company trying to expand their operations to the whole solar system. This project is an API for Stomble to use with their interplanetary travels, developed to manage the logistics of Stomble's fleet of spaceships.

## Technologies

This project uses:

- Typescript
- Serverless

# Data Tables
This is the curent layout of the data needed for this project:
Spaceship {
  id: String,
  name: String,
  model: String,
  locationID: String, //used to directly link the spacship and it's location without duplicate data in database
  status: [DECOMISSIONED | MAINTENANCE | OPERATIONAL] //Probally need a ENUM for this
}

Location {
  id: String,
  cityName: String,
  planetName: String,
  totalAvailableCapacity: number,
  currentCapacity: number //Used to track the total amount of space is currently available within this location (to check if it is full or not)
}

## Backlog
- Add spaceship endpoint
- Add location endpoint
- Update Spaceship endpoint
- Remove Spaceship endpoint
- Remove location endpoint
- travel functionality endpoint
- connect AWS DynamoDB
