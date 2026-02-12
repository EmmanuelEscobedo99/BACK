import UserModel from '../models/UserModel.js'

import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

import { registerSchema } from '../schemas/authSchema.js'

export const registerUser = async (req, res) => {
    try {
        // Traer clave secreta de JWT

        const JWT_SECRET = process.env.JWT_SECRET

        // Extraer los datos del usuario

        const { username, email, password } = registerSchema.parse(req.body)

        // Comprobar si ua existe el usuario

        const existingUser = await UserModel.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' })
        }

        // Encriptar la contrasena

        const hashedPassword = await bcrypt.hash(password, 10)

        // Comprobar el usuario admin

        const isFirstUser = (await UserModel.countDocuments()) === 0

        // Crear el usuario y guardar en la BD

        const newUser = await UserModel.create({
            username,

            email,

            password: hashedPassword,

            isAdmin: isFirstUser,
        })

        // Generar un token con JWT

        // payload

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
            expiresIn: '1h',
        })

        // header.payload.signature

        //Enviar el token como una cookie

        res.cookie('accessToken', token, {
            httpOnly: true,

            secure: process.env.NODE_ENV === 'production', // true,

            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',

            maxAge: 60 * 60 * 1000,
        })

            .status(201)

            .json({ message: 'Usuario registrado exitosamente' })

        console.log(newUser)

        res.json({ newUser: newUser })

        res.json({ hashedPass: hashedPassword })
    } catch (error) {
        res.json(error)
    }
}

export const profile = async (req, res) => {
    // Extraer el accesToken enviado por el cliente

    const token = req.cookies.accessToken

    try {
        // Verificar o decodificar el token

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Buscar el usuario en la base de datos
        const user = await UserModel.findById(decoded.userId)

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        res.status(200).json({
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            username: user.username,
        })
    } catch (error) {
        console.log(error)
    }

    return {
        user: 'test user',
    }
}
