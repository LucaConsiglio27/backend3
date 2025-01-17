import PetModel from '../models/pet.model.js';
import logger from '../utils/logger.js';

export const getPets = async (req, res) => {
    try {
        const pets = await PetModel.find();
        res.status(200).json({ status: 'success', pets });
    } catch (error) {
        logger.error('Error fetching pets:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

export const createPet = async (req, res) => {
    const { name, type, age } = req.body;

    try {
        const newPet = new PetModel({ name, type, age, adopted: false });
        await newPet.save();
        res.status(201).json({ status: 'success', pet: newPet });
    } catch (error) {
        logger.error('Error creating pet:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};
