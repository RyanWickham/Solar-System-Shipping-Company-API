# Stombla-Solar-System-Shipping-Company-API

In the distant future, humans have colonised all planets in our solar system. Stomble, a shipping company trying to expand their operations to the whole solar system. This project is an API for Stomble to use with their interplanetary travels, developed to manage the logistics of Stomble's fleet of spaceships.

## Technologies

This project uses:

- Typescript
- Serverless

## Endpoints

### Add a Location

Post Request
{url}/location

Requires a JSON string to be submitted with this request
{
id: string,
cityName:string,
planetName: string
}

## Data Tables
This is the curent layout of the data needed for this project:

Spaceship {<br/>
__id: String,<br/>
__name: String,<br/>
__model: String,<br/>
__locationID: String, //used to directly link the spacship and it's location without duplicate data in database.<br/>
__status: [DECOMISSIONED | MAINTENANCE | OPERATIONAL] //Probally need a ENUM for this.<br/>
}<br/>
<br/>

Location {<br/>
__id: String,<br/>
__cityName: String,<br/>
__planetName: String,<br/>
__totalAvailableCapacity: number,<br/>
__currentCapacity: number //Used to track the total amount of space is currently available within this location (to check if it is full or not)<br/>
}<br/>

## Backlog
- [ ] Add spaceship endpoint
- [ ] Add location endpoint
- [ ] Update Spaceship endpoint
- [ ] Remove Spaceship endpoint
- [ ] Remove location endpoint
- [ ] travel functionality endpoint
- [ ] connect AWS DynamoDB
