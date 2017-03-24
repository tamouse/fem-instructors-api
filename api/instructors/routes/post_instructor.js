'use strict';

const query = require('./../queries/instructors');
let instructorsData = require('./../../../data/instructors');
const payloadValidator = require('./../validation/post_instructor').payloadValidator;

module.exports = {
    method: 'POST',
    path: '/api/instructors',
    config: {
        validate: {
            payload: payloadValidator
        },
        pre: [
            { method: query.verifyUniqueInstructor },
            { method: query.createInstructorSlug, assign: 'slug' }
        ],
        handler: (request, reply) => {
            let submittedData = request.payload;
            submittedData.id = instructorsData.length + 1;
            submittedData.slug = request.pre.slug;
            instructorsData.push(submittedData);

            // The way we respond depends on what we want
            // to do in the app afterwards
            // reply({ message: 'Instructor added!' });
            reply(instructorsData.find(item => item.slug == request.pre.slug));
        }
    }
};