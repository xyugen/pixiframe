import bcrypt from 'bcryptjs';
const saltRounds = 10;

export const hashPasswords = async (password: string) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log('Error while hashing password: ', error);
        throw error;
    }
}

export const comparePasswords = async (password: string, hashedPassword: string) => {
    try {
        const result = await bcrypt.compare(password, hashedPassword);
        return result;
    } catch (error) {
        console.log('Error while comparing passwords: ', error);
        throw error;
    }
}