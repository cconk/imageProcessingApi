import express from 'express'

const app = express()

const port = 3000

const logger = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  const url = req.url;
  console.log(`${url} was visited`);
  next();
};

app.get('/', logger, (req, res) => {
  
  res.send(
    '<h1>Welcome Home</h1>'
  );
});

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
});


