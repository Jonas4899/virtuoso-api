import express from 'express'
import Chat from './models/conversation.mjs'

export const router = express.Router()

router.post('/chat', async (req, res) => {
  const { title, messages } = req.body

  try {
    const chat = new Chat({ title, messages })
    await chat.save()
    res.status(201).json(chat)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/chat/:chatId', async (req, res) => {
  const { chatId } = req.params

  try {
    const chat = await Chat.findById(chatId)
    if (!chat) return res.status(404).json({ message: 'Chat not found' })
    res.json(chat)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
