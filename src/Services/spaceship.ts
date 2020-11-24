
export const addSpaceshipService = (data: {id: string, }) => {
    return {
        message: ""
    }
}

export const deleteSpaceshipService = (data: {id: string}) => {
    return {
        message: "Spaceship with ID: " + data.id + ", was sent to be deleted."
    }
}

export const spaceshipHelpService = () => {
    return {
        message: "",
        post: {

        },
        delete: {
            id: 'required string -> id of spaceship to be deleted'
        }
    }
}