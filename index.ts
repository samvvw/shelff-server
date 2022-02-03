import express from 'express'

const app = express()
const variable: any = 'strindsfdfg'
app.get('/', (req: any, res) => {
    const { arg } = req.body
    res.send(arg)
})

app.listen(8080, () => console.log('Server running on http://localhost:8080'))
