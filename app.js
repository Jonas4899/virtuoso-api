const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch') // Asegúrate de tener node-fetch instalado o usa el fetch nativo si está disponible

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3000
const API_KEY = 'sk-proj-ETKMRrPYAceMJIA28tbkT3BlbkFJszYSf6Ma6iCZ39LYMHWo'
const endpoint = 'https://api.openai.com/v1/chat/completions'

app.post('/completions', async (req, res) => {
  const { messages } = req.body

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 1000
    })
  }

  try {
    const response = await fetch(endpoint, options) // Cambiado res a response
    const data = await response.json() // Cambiado res a response
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' }) // Corregido el mensaje de error
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
