import {addLocationService, deleteLocationService, locationHelpService} from './location';
import {addSpaceshipService, deleteSpaceshipService, spaceshipHelpService} from './spaceship';



export default {
    addLocation: addLocationService,
    deleteLocation: deleteLocationService,
    locationHelp: locationHelpService,

    addSpaceship: addSpaceshipService,
    deleteSpaceship: deleteSpaceshipService,
    spaceshipHelp: spaceshipHelpService,
}