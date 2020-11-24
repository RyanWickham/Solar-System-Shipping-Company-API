import {addLocationService, deleteLocationService, locationHelpService} from './location';
import {addSpaceshipService, updateSpaceshipStatusService, deleteSpaceshipService, spaceshipHelpService} from './spaceship';



export default {
    addLocation: addLocationService,
    deleteLocation: deleteLocationService,
    locationHelp: locationHelpService,

    addSpaceship: addSpaceshipService,
    updateSpaceshipStatus: updateSpaceshipStatusService,
    deleteSpaceship: deleteSpaceshipService,
    spaceshipHelp: spaceshipHelpService,
}