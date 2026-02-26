import express from 'express'
import { connectDB, disconnectDB } from './config/configdb.js'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productsRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

const PORT = 3001

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cookie',
            'Set-Cookie',
        ],
        credentials: true,
    })
)
app.use(cookieParser())
app.use(express.json())
// Rutas API
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto: ${PORT}`)
        })
    })
    .catch(() => {
        disconnectDB()
    })
