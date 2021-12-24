import express from 'express'

const app = express()

const port = 3000

app.get('/api', (req, res) => {
  res.send(
    '<h1>Welcome Home</h1>'
  );
})

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})


