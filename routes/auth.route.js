import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import {body} from 'express-validator';
import { validationAuth } from '../middlewares/validationAuth.js';

const router = express.Router();

router.post("/register",
                    [
                        body("email", "formato email incorrecto" ).trim().isEmail().normalizeEmail(),
                        body("password" , "formato de password incorrecto").trim().isLength({min : 6})
                        .custom((value, {req}) =>{ 
                            if(value !== req.body.repassword){
                            throw  new Error("no coinciden las contraseñas");}
                            return value
                        })
                    ], 
                    validationAuth,
                    register
)
router.post("/login",
                    [
                        body("email", "formato email incorrecto" ).trim().isEmail().normalizeEmail(),
                        body("password" , "formato de password incorrecto").trim().isLength({min : 6})
                    ] ,
                    validationAuth,
                     login
)
 

export default router;