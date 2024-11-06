// src/controllers/data.controller.js
const { generatePets } = require('../mocks/mockingPets');
const { generateUsers } = require('../mocks/mockingUsers');

exports.generateMockPets = (req, res) => {
    const pets = generatePets(100);
    res.json(pets);
};

exports.generateMockUsers = async (req, res) => {
    const users = await generateUsers(50);
    res.json(users);
};

exports.insertMockData = async (req, res) => {
    const { users, pets } = req.body;
    // Aquí se insertarían en la base de datos
    res.json({ message: `Inserted ${users} users and ${pets} pets` });
};
