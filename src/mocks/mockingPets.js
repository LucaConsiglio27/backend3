// src/mocks/mockingPets.js
const faker = require('faker');

const generatePets = (count) => {
    return Array.from({ length: count }).map(() => ({
        name: faker.name.firstName(),
        type: faker.animal.type(),
        age: faker.datatype.number({ min: 1, max: 15 }),
        adopted: false,
    }));
};

module.exports = { generatePets };
