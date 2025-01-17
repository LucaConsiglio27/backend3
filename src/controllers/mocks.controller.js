import bcrypt from 'bcrypt';
import Pet from '../models/pet.model.js';
import User from '../models/user.model.js';
import { faker } from '@faker-js/faker';

export const generateMockPets = (req, res) => {
    const pets = Array.from({ length: 100 }, () => ({
        name: faker.animal.dog(),
        species: faker.random.arrayElement(['dog', 'cat']),
        breed: faker.animal.type(),
        age: faker.datatype.number({ min: 1, max: 15 }),
        adopted: false,
    }));
    res.json(pets);
};

export const generateMockUsers = (req, res) => {
    const users = Array.from({ length: 50 }, () => ({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('coder123', 10),
        role: faker.random.arrayElement(['user', 'admin']),
        pets: [],
    }));
    res.json(users);
};

export const generateData = async (req, res, next) => {
    try {
        const { users, pets } = req.body;

        if (users) {
            const newUsers = Array.from({ length: users }, () => ({
                name: faker.name.findName(),
                email: faker.internet.email(),
                password: bcrypt.hashSync('coder123', 10),
                role: faker.random.arrayElement(['user', 'admin']),
                pets: [],
            }));
            await User.insertMany(newUsers);
        }

        if (pets) {
            const newPets = Array.from({ length: pets }, () => ({
                name: faker.animal.dog(),
                species: faker.random.arrayElement(['dog', 'cat']),
                breed: faker.animal.type(),
                age: faker.datatype.number({ min: 1, max: 15 }),
                adopted: false,
            }));
            await Pet.insertMany(newPets);
        }

        res.status(201).json({ message: 'Datos generados exitosamente' });
    } catch (error) {
        next(error);
    }
};
