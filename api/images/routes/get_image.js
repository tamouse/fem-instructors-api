'use strict';

module.exports = {
    method: 'GET',
    path: '/api/images/{name}',
    config: {
        handler: (request, reply) => {
            // Let's grab the image name that is
            // passed as a path param
            const imageName = request.params.name;

            // Log out the user's IP address.
            // We could use this to keep track
            // of where requests are coming from
            const userIP = request.info.remoteAddress;
            console.log(`user's IP address: ${userIP}`);

            // Let's reply with the static file
            reply.file(imageName);
        }
    }
};