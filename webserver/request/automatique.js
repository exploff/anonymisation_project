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

router.post('/suppression', (req, res) => {
    console.log(req.body);
    if (req.body.typeAnonymisation == 'Suppression') {
      let columns = req.body.columns.join(' ');
      let command = 'python ../scripts/anonymisation/suppression.py ' + req.body.table + " " + columns;
      execCommand(res, command);
    } else {
      res.status(404).send(new Response(404, '', 'Type d\'anonymisation non reconnu'));
    }
})


router.post('/masking', (req, res) => {
  console.log(req.body);
  if (req.body.typeAnonymisation == 'Character Masking') {
    let columns = req.body.columns.join(' ');
    let command = 'python ../scripts/anonymisation/masking.py ' + req.body.table + " " + columns;
    console.log("command : " + command)
    execCommand(res, command);
  } else {
    res.status(404).send(new Response(404, '', 'Type d\'anonymisation non reconnu'));
  }
})


router.post('/randomisation', (req, res) => {
  console.log(req.body);
  if (req.body.typeAnonymisation == 'Randomisation') {
    let columns = req.body.columns.join(' ');
    let type = req.body.typeRandomisation;
    let command = 'python ../scripts/anonymisation/random_general.py ' + req.body.table + " " + type + " " + columns;
    console.log("command : " + command)
    execCommand(res, command);
  } else {
    res.status(404).send(new Response(404, '', 'Type d\'anonymisation non reconnu'));
  }
})

function execCommand(res, command) {
  exec(command, (err, stdout, stderr) => {
    let responsePython;
    if (err) {
      responsePython = new PythonResponse(err.code, stdout);
      res.status(500).send(new Response(500, responsePython.message + " : " + responsePython.status, ''));
    } else {
      responsePython = new PythonResponse(0, stdout);
      res.status(200).send(new Response(200, '', responsePython.message + " : " + responsePython.status));
    }
  })
}

module.exports = router;