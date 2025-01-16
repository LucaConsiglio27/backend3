import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    pets: { type: [mongoose.Schema.Types.ObjectId], ref: 'Pet', default: [] },
    documents: [
        {
            name: { type: String, required: true },
            reference: { type: String, required: true },
        },
    ],
    last_connection: { type: Date, default: null },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export default mongoose.model('User', userSchema);
