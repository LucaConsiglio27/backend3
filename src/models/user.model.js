// src/models/user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
