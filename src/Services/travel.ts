export const spaceshipTravelToService = (io: {[key: string]: any}, data: {spaceshipID: string, distinationID: string}) => {
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