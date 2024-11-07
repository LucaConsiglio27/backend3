// src/mocks/mockingPets.js
const faker = require('faker');

/**
 * Genera una lista de mascotas con el formato de MongoDB.
 * @param {number} count - Número de mascotas a generar.
 * @returns {Array} - Array de objetos mascota.
 */
const generatePets = (count) => {
    return Array.from({ length: count }).map(() => ({
        name: faker.name.firstName(),
        type: faker.animal.type(),
        age: faker.datatype.number({ min: 1, max: 15 }),
        adopted: false,
    }));
};

module.exports = { generatePets };
