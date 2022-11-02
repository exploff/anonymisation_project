const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.text());
app.use(express.json());

app.get('/api', (req, res) => {
  console.log("Request /api from : " + req.socket.remoteAddress);
  try {
    let result = {
      title: "Anonymisation Base de données",
      version: "1.0.0",
      type: "Project Ydays - YNOV - Toulouse",
      author: "Hossameddine - Nathan - Roy - Julien"
    }
    res.setHeader('content-type', 'application/json');
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


app.listen(3000, () => {
  console.log('Server started');
})