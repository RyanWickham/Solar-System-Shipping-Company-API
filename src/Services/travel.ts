import io from '../IO/index';

export const spaceshipTravelToService = async (io: {[key: string]: any}, data: {spaceshipID: string, distinationID: string}) => {
    //get the spaceship's status to check if it is operational
    const spaceshipGetResult = await io.database.get({
        tableName: io.database.tableNames.spaceships,
        item: {id: data.spaceshipID}
    });

    //check if spaceship exists
    if(spaceshipGetResult.item == null){
        //no iteam was found
        return {
            message: "Spaceship with ID: " + data.spaceshipID + ", was not found.",
            response: {
                spaceshipGetResponse: spaceshipGetResult,
            }
        }
    }

    //spaceship exists
    //spaceships can only change location if their status == operational
    if(spaceshipGetResult.item.status != io.spaceshipStatusValues.operational){
        return {
            message: "Spaceship with ID: " + data.spaceshipID + ", status is not operational -> can not travel.",
            response: {
                spaceshipGetResponse: spaceshipGetResult,
            }
        }
    }

    // get the destination location and determine if it has the capacity for a new spaceship
    const locationIDResponse = await io.database.get({
        tableName: io.database.tableNames.locations,
        item: {id: data.distinationID}
    });

    //perform a check if destination location is valid
    if(locationIDResponse.item == null){
        //no location at this ID
        return {
            message: "Location with destination location ID: " + data.distinationID + ", does not exists -> can not travel.",
            response: {
                locationIDResponse: locationIDResponse,
            }
        }
    }

    //current location is validated when spaceship was added
    //change ship location

    //old location current capacity -1


    //new location current capacity +1


    return {
        message: "Spaceship ID: " + data.spaceshipID + ", traveling to location ID: " + data.distinationID + "."
    }
}

export const travelHelpService = () => {
    return {
        message: "Travel Help: The following obejects are the parmaters of what is required to submit the corrasponding HTTP requests on /location.",
        spaceshipTravelTo: {
            path: '/travel',
            HTTPStatusCode: 'post',
            requiredJSON:  {
                spaceshipID: 'required string',
                distinationID: 'required string',
            },
        },
    }
}