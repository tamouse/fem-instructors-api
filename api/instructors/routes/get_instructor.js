'use strict';

const instructorsData = require('../../../data/instructors');

module.exports = {
    method: 'GET',
    path: '/api/instructors/{slug}',
    config: {
        handler: (request, reply) => {
            // get the specified instructor
            console.log(`requested slug: ${request.params.slug}`)
            const instructor = instructorsData.find(
                inst => inst.slug === request.params.slug
            );
            if (instructor) {
                reply(instructor)
            } else {
                // eventually we'll use boom to properly handle the errors
                reply({ message: "Not found" })
            }
        }
    }
};