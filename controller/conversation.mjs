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

// Controlador para actualizar los mensajes de un chat
export const updateMessages = async (req, res) => {
  const { chatId } = req.params
  const { messages } = req.body

  try {
    if (!messages || !Array.isArray(messages)) {
      return res
        .status(400)
        .json({ message: 'Se requiere un arreglo de mensajes válido' })
    }

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { messages },
      { new: true }
    )

    if (!updatedChat) {
      return res.status(404).json({ message: 'Chat no encontrado' })
    }

    return res.status(200).json(updatedChat)
  } catch (error) {
    return res
      .status(500)
      .json({
        message: 'Error al actualizar los mensajes',
        error: error.message
      })
  }
}

export const deleteChat = async (req, res) => {
  const { chatId } = req.params;

  try {
    const deletedChat = await Chat.findByIdAndDelete(chatId);
    if (!deletedChat) {
      return res.status(404).json({ mensaje: 'Chat no encontrado' });
    }
    return res.status(200).json({ mensaje: 'Chat eliminado con éxito', chat: deletedChat });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar el chat', error: error.message });
  }
};
