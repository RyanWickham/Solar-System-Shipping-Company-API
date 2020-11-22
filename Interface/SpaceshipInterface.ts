import { Location } from './LocationInterface';

enum SPACESHIP_STATUS {DECOMMISIONED, MAINTENANCE, OPERATIONAL};

export interface Spaceship {
    spaceshipID: String,
    name: String,
    model: String,
    location: Location,
    status: SPACESHIP_STATUS
}