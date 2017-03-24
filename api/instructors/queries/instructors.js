'use strict';

const Wreck = require('wreck');
let instructorsData = require('../../../data/instructors');

// When someone goes to create a new instructor, we
// should check whether they exist already. This is a good
// use case for route prerequisites
const verifyUniqueInstructor = (request, reply) => {
    const foundInstructor = instructorsData.find(
        inst => inst.email === request.payload.email
    )
    if (foundInstructor) {
        reply(Boom.)
    }
};

// We need to create a slug for the instructor.
// This could be done without much fuss right in the
// handler, but why not let it be done in the route
// prereq instead
const createInstructorSlug = (request, reply) => {
    const newSlug = request.payload.name.replace(' ', '-').toLowerCase()
    reply(newSlug)
};

// Route prerequisites support both sync and async
// operations. The reply interface in the handler
// won't be called until this request is fulfilled
const getGithubImage = (request, reply) => {
    reply('http://placekitten.com/g/200/200')
};

module.exports = {
    verifyUniqueInstructor,
    createInstructorSlug,
    getGithubImage
};