import bcrypt from 'bcryptjs';

/**
 * Hashes the user's password if it is new or modified.
 * 
 * @param {Function} next - The next middleware function in the stack.
 */
export const hashPassword = async (next) => {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
};

export const comparePassword = async (candidatePassword) => {
    return await bcrypt.compare(candidatePassword, this.password);
};
