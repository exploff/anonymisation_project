const { exec } = require('child_process');
const express = require('express');
const router = express.Router();


class Response {
    constructor(status, error, success) {
        this.status = status,
        this.error = error,
        this.success = success
    }
}

class PythonResponse {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}

router.post('/', (req, res) => {
    console.log(req.body);
  
    if (req.body.typeAnonymisation == 'Suppression') {
      exec('python ../scripts/anonymisation/suppression.py', (err, stdout, stderr) => {
        let responsePython;
        if (err) {
          responsePython = new PythonResponse(err.code, stdout);
          res.status(400).send(new Response(400, responsePython.message + " : " + responsePython.status, ''));
        } else {
          responsePython = new PythonResponse(0, stdout);
          res.status(200).send(new Response(200, '', responsePython.message + " : " + responsePython.status));
        }
      })
    } else {
      res.status(404).send(new Response(404, '', 'Type d\'anonymisation non reconnu'));
    }
})

module.exports = router;