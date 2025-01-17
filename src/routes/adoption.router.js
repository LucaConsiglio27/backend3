import express from 'express';
import AdoptionModel from '../models/adoption.model.js';
import PetModel from '../models/pet.model.js';
import UserModel from '../models/user.model.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Obtener todas las adopciones
router.get('/', async (req, res) => {
  try {
    const adoptions = await AdoptionModel.find().populate('pet').populate('adopter');
    res.status(200).json({ status: 'success', adoptions });
  } catch (error) {
    logger.error('Error fetching adoptions:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// Crear una nueva adopción
router.post('/', async (req, res) => {
  const { petId, adopterId } = req.body;

  try {
    // Validar si la mascota existe y no está adoptada
    const pet = await PetModel.findById(petId);
    if (!pet) {
      return res.status(404).json({ status: 'error', message: 'Pet not found' });
    }
    if (pet.adopted) {
      return res.status(400).json({ status: 'error', message: 'Pet is already adopted' });
    }

    // Validar si el adoptante existe
    const adopter = await UserModel.findById(adopterId);
    if (!adopter) {
      return res.status(404).json({ status: 'error', message: 'Adopter not found' });
    }

    // Crear la adopción
    const newAdoption = new AdoptionModel({ pet: petId, adopter: adopterId });
    await newAdoption.save();

    // Marcar la mascota como adoptada
    pet.adopted = true;
    await pet.save();

    res.status(201).json({ status: 'success', message: 'Adoption created', adoption: newAdoption });
  } catch (error) {
    logger.error('Error creating adoption:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// Eliminar una adopción
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const adoption = await AdoptionModel.findById(id);
    if (!adoption) {
      return res.status(404).json({ status: 'error', message: 'Adoption not found' });
    }

    // Marcar la mascota como no adoptada
    const pet = await PetModel.findById(adoption.pet);
    if (pet) {
      pet.adopted = false;
      await pet.save();
    }

    // Eliminar la adopción
    await AdoptionModel.findByIdAndDelete(id);

    res.status(200).json({ status: 'success', message: 'Adoption deleted' });
  } catch (error) {
    logger.error('Error deleting adoption:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

export default router;
