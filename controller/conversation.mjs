import Chat from '../models/conversation.mjs'

export const getData = (req, res) => {
  const { chatId } = req.params

  Chat.findById(chatId, (err, chat) => {
    if (err) {
      return res
        .status(500)
        .json({ message: 'Error al buscar el chat', error: err })
    }
    if (!chat) {
      return res.status(404).json({ message: 'Chat no encontrado' })
    }
    return res.status(200).json(chat)
  })
}
