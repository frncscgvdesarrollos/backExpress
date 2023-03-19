import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'


export const register = async (req,res)=>{
    const {email, password} = req.body;
    try {
        const user = new User({email: email, password: password})        
        await user.save()
        return res.status(201).json({ok:true})
        //generar JWT 
    } catch (error) {
        return res.status(400).json({error: "ese email ya esta siendo usado"});
    }
};
export const login = async (req,res)=>{
    //desestructuramos los datos del body 
    const {email, password} = req.body;
    //hacemos un try catch para ver si existe el email
    try {
        const user = await User.findOne({email});
        //si no existe le devolvemos un status 400 y un mensaje 
        if(!user){
            return res.status(400).json({error:"usuario no existe"})
        }
        // si existe el email comparamos la password
        const responsePassword = await user.comparePassword(password)
        // si la password es incorrecta devolvemos el error
        if(!responsePassword) return res.status(400).json({error:"contraseña incorrecta"});

        //si el usuario y la contraseña es correcta generamos el token JWT
        const token = jwt.sign({uid: user.id}, process.env.JWT_SECRET)

        return res.status(200).json({token})
    } catch (error) {
        //manejamos el error del servidor en el caso que este todo bien pero no se pueda loguear. 
         res.status(500).json({message: "error en servidor"})   
    }
};
