import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const DB_URI = process.env.MONGODB_URI

const connectDB = () => {
  const connect = () => {
    mongoose
      .connect(DB_URI)
      .then(() => {
        console.log('¡Conexión correcta!')
      })
      .catch((err) => {
        console.log('¡DB: ERROR!', err)
      })
  }
  connect()
}

export default connectDB
