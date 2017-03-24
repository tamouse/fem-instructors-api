'use strict';

const Boom = require('boom');
const Wreck = require('wreck');
let instructorsData = require('../../../data/instructors');

// When someone goes to create a new instructor, we
// should check whether they exist already. This is a good
// use case for route prerequisites
const verifyUniqueInstructor = (request, reply) => {
    const name = request.payload.name;
    const existingInstructor = instructorsData.find(
        instructor => instructor.name === name
    );
    if (existingInstructor) {
        return reply(Boom.badRequest('Instructor already found'));
    }
    return reply();
};

// We need to create a slug for the instructor.
// This could be done without much fuss right in the
// handler, but why not let it be done in the route
// prereq instead
const createInstructorSlug = (request, reply) => {
    const name = request.payload.name;
    const slug = name.split(' ').join('-');
    reply(slug.toLowerCase());
};

// Route prerequisites support both sync and async
// operations. The reply interface in the handler
// won't be called until this request is fulfilled
const getGithubImage = (request, reply) => {
    const slug = request.params.slug;
    let githubUser = instructorsData.find(
        instructor => instructor.slug == slug
    );

    if (!githubUser) return reply();
    githubUser = githubUser.github;

    const options = {
        headers: { 'User-Agent': 'fem-instructors-api' },
        json: true
    };
    Wreck.get(
        `https://api.github.com/users/${githubUser}`,
        options,
        (error, response, payload) => {
            if (error) {
                return reply(Boom.badRequest('something went wrong getting github user\'s avatar'));
            }
            reply(payload.avatar_url);
        }
    );
};

module.exports = {
    verifyUniqueInstructor,
    createInstructorSlug,
    getGithubImage
};