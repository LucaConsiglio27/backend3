import { faker } from '@faker-js/faker';

export const generateMockPets = (quantity) => {
    return Array.from({ length: quantity }, () => ({
        name: faker.animal.type(),
        age: faker.datatype.number({ min: 1, max: 15 }),
        breed: faker.animal.dog(),
        adopted: false,
        owner: null,
    }));
};

export const generateMockUsers = (quantity) => {
    return Array.from({ length: quantity }, () => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: "coder123", // Contraseña en texto plano que será encriptada luego.
        role: faker.helpers.randomize(['user', 'admin']),
        pets: [],
    }));
};
