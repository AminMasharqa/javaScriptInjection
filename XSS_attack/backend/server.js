const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

let userInput = '';

app.post('/submit', (req, res) => {
    userInput = req.body.userInput;
    res.send({ userInput });
});

app.get('/data', (req, res) => {
    res.send({ userInput });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
