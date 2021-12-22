import express from 'express';

const app = express();

const port = 3000;

app.get('/api', (req, res) => {
    res.send('Hello, world!')
});

app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})

const myName = 'chad conklin';

const hello = (userName: string): string => `hello , ${userName}`;

console.log(hello(myName));

