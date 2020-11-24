
export const addSpaceshipService = (data: {id: string, name: string, model: string, locationID: string, status: string}) => {
    return {
        message: "Spaceship Added: ID: " + data.id + ", name: " + data.name + ", model: " + data.model
        + ", Location ID " + data.locationID + ", status: " + data.status,
    }
}

export const updateSpaceshipStatusService = (data: {id: string, newStatus: string}) => {
    return {
        message: "Spaceship with ID: " + data.id + ", was sent to have it's status to: " + data.newStatus + ".",
    }
}

export const deleteSpaceshipService = (data: {id: string}) => {
    return {
        message: "Spaceship with ID: " + data.id + ", was sent to be deleted.",
    }
}

export const spaceshipHelpService = () => {
    return {
        message: "Spaceship Help: The following obejects are the parmaters of what is required to submit the corrasponding HTTP requests on /spaceship.",
        addSpaceship: {
            path: '/spaceship',
            HTTPStatusCode: 'post',
            requiredJSON: {
                id: 'required string',
                name: 'required string',
                model: 'required string',
                locationID: 'required string',
                status: "required string [DECOMMISSIONED | MAINTENANCE | OPERATIONAL]"
            },
        },
        updateStatus: {
            path: '/spaceship/status',
            HTTPStatusCode: 'put',
            requiredJSON: {
                id: 'required string',
                newStatus: "required string [DECOMMISSIONED | MAINTENANCE | OPERATIONAL]"
            },
        },
        deleteSpaceship: {
            path: '/spaceship',
            HTTPStatusCode: 'delete',
            requiredJSON: {
                id: 'required string -> id of spaceship to be deleted'
            },
        }
    }
}