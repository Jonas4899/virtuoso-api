import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  })
)
app.use(express.json())

const PORT = 3000
const API_KEY = 'sk-proj-ETKMRrPYAceMJIA28tbkT3BlbkFJszYSf6Ma6iCZ39LYMHWo'
const endpoint = 'https://api.openai.com/v1/chat/completions'

app.get('/completions', async (req, res) => {
  let messages
  try {
    messages = JSON.parse(req.query.messages)
  } catch (error) {
    return res.status(400).json({ error: 'Invalid messages format' })
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 1000,
      stream: true
    })
  }

  try {
    const response = await fetch(endpoint, options)

    if (!response.ok) {
      const errorText = await response.text()
      return res.status(response.status).json({ error: errorText })
    }

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    response.body.on('data', (chunk) => {
      const message = chunk.toString()
      if (message.trim() !== '') {
        res.write(`data: ${message}\n\n`)
      }
    })

    response.body.on('end', () => {
      res.write('data: [DONE]\n\n')
      res.end()
    })

    response.body.on('error', (err) => {
      console.error('Stream error:', err)
      res.write('event: error\n')
      res.write(`data: ${JSON.stringify({ error: 'Stream error' })}\n\n`)
      res.end()
    })
  } catch (error) {
    console.error('Fetch error:', error)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
