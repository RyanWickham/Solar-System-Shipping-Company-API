
export enum SPACESHIP_STATUS {DECOMMISIONED, MAINTENANCE, OPERATIONAL};

export interface Spaceship {
    spaceshipID: String,
    name: String,
    model: String,
    locationID: number,
    status: SPACESHIP_STATUS
}