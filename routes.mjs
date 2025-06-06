import express from 'express'
import { getData, updateMessages, deleteChat } from './controller/conversation.mjs'
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

router.get('/chat/:chatId', getData)

router.put('/chat/:chatId/messages', updateMessages)

router.delete('/chat/:chatId', deleteChat)
