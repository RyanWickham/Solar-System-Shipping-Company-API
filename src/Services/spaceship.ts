
export const addSpaceshipService = (data: {id: string, name: string, model: string, locationID: string, status: string}) => {
    return {
        message: "Spaceship Added: ID: " + data.id + ", name: " + data.name + ", model: " + data.model
        + ", Location ID " + data.locationID + ", status: " + data.status,
    }
}

export const deleteSpaceshipService = (data: {id: string}) => {
    return {
        message: "Spaceship with ID: " + data.id + ", was sent to be deleted."
    }
}

export const spaceshipHelpService = () => {
    return {
        message: "Spaceship Help: The following obejects are the parmaters of what is required to submit the corrasponding HTTP requests on /spaceship.",
        post: {
            id: 'required string',
            name: 'required string',
            model: 'required string',
            locationID: 'required string',
            status: "required string [DECOMMISSIONED | MAINTENANCE | OPERATIONAL]"
        },
        delete: {
            id: 'required string -> id of spaceship to be deleted'
        }
    }
}