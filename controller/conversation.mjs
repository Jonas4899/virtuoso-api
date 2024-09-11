import Chat from '../models/conversation.mjs'

export const getData = async (req, res) => {
  const { chatId } = req.params

  try {
    const chat = await Chat.findById(chatId)
    if (!chat) {
      return res.status(404).json({ message: 'Chat no encontrado' })
    }
    return res.status(200).json(chat)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error al buscar el chat', error: error.message })
  }
}
