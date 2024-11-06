// src/mocks/mockingUsers.js
const faker = require('faker');
const bcrypt = require('bcrypt');

const generateUsers = async (count) => {
    const password = await bcrypt.hash('coder123', 10);
    return Array.from({ length: count }).map(() => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password,
        role: faker.random.arrayElement(['user', 'admin']),
        pets: [],
    }));
};

module.exports = { generateUsers };
