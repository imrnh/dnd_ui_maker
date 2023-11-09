

// src/routes/api/all_app_by_userid.ts

export const get: RequestHandler = async (request) => {
    try {
        // Your server-side logic here
        const data = { message: 'Hello from the server!' };

        return {
            status: 200,
            body: data,
        };
    } catch (error) {
        return {
            status: 500,
            body: { message: 'Internal Server Error' },
        };
    }
};



