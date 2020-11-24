export const IOHandler = {
    bodyJSON: data => JSON.parse(data.body),

    returnSuccess: data => ({
        statusCode: 200,
        body: JSON.stringify(data, null, 2),
    }),

    returnError400: data => ({
        statusCode: 400,
        body: JSON.stringify(data, null, 2),
    }),
}