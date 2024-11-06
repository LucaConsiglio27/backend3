// src/utils/errorDictionary.js
const errorDictionary = {
    USER_ALREADY_EXISTS: { code: 1001, message: 'User already exists' },
    INVALID_USER_DATA: { code: 1002, message: 'Invalid user data' },
    PET_CREATION_ERROR: { code: 2001, message: 'Error creating pet' },
};

class CustomError extends Error {
    constructor(type) {
        super(errorDictionary[type].message);
        this.code = errorDictionary[type].code;
    }
}

module.exports = { CustomError, errorDictionary };
