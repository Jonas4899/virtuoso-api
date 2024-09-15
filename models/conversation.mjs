import mongoose from 'mongoose'
const MessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['system', 'assistant', 'user'], // Define los roles permitidos
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

const ChatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  messages: [MessageSchema] // Define el arreglo de mensajes usando el MessageSchema
})
const Chat = mongoose.model('Chat', ChatSchema)
export default Chat
