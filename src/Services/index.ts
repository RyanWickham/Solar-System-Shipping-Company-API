import {addLocationService, deleteLocationService, locationHelpService} from './location';
import {addSpaceshipService, updateSpaceshipStatusService, deleteSpaceshipService, spaceshipHelpService} from './spaceship';
import {spaceshipTravelToService, travelHelpService} from "./travel";

export default {
    //Location Services
    addLocation: addLocationService,
    deleteLocation: deleteLocationService,
    locationHelp: locationHelpService,

    //Spaceship Services
    addSpaceship: addSpaceshipService,
    updateSpaceshipStatus: updateSpaceshipStatusService,
    deleteSpaceship: deleteSpaceshipService,
    spaceshipHelp: spaceshipHelpService,

    //Travel Services
    spaceshipTravelTo: spaceshipTravelToService,
    travelHelp: travelHelpService,
}