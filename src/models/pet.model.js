import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    adopted: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
});

export default mongoose.model('Pet', petSchema);
