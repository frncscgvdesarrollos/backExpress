import bcryptjs from 'bcryptjs';
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim:true,
        unique:true,
        lowercase:true,
        index: {unique:true}
    },
    password: {
        type: String,
        required:true
    }
});
userSchema.pre("save", async function(next){
    const user = this
    if(!user.isModified('password')) return next()
    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next
    } catch (error) {
        throw new Error("error de encriptacion de contraseña");
    }
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcryptjs.compare(candidatePassword, this.password)
};
export const User = mongoose.model('User',userSchema);