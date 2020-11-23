export const IOHandler = {
    input: data => JSON.parse(data.body),

    returnSuccess: data => ({
        statusCode: 200,
        body: JSON.stringify(data, null, 2),
    })
}

// export default {
//     IOHandler: IOHandler
// }