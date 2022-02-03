import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello Shelff server')
})

app.listen(8080, () => console.log('Server running on http://localhost:8080'))
