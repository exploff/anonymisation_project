const { exec } = require("child_process");
const express = require("express");
const router = express.Router();

class Response {
  constructor(status, error, success) {
    (this.status = status), (this.error = error), (this.success = success);
  }
}

class PythonResponse {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

router.get("/:table_name", (req, res) => {
  var table_name = req.params.table_name;
  if (table_name) {
    let sendResult = {
      table: "",
      data: [],
    };
    sendResult.table = table_name;
    let command =
      "python scripts/ner/detection.py " +
      table_name +
      " " +
      process.env.DATABASE;

    console.log(command)  
    execCommand(res, command);
  } else {
    res
      .status(404)
      .send(new Response(404, "Error 404 : Missing table name or limit", ""));
  }
});


router.post('/:table_name/suppression', (req, res) => {
  console.log(req.body);
  if (req.body.typeAnonymisation == 'Suppression') {
    let table = req.body.table;
    let columns = req.body.columns;
    try {
      columns.forEach((column) => {
        let command = 'python scripts/anonymisation/suppression_manuel.py ' + table + " " + column.column + " " + column.containData;
        console.log(command)
        exec(command, (err, stdout, stderr) => {
        });
      });
      res.status(200).send(new Response(200, "", "Suppression success"));
    } catch(err) {
      res.status(500).send(new Response(500, '', 'Erreur dans l execution du script python'));
    }
  } else {
    res.status(404).send(new Response(404, '', 'Type d\'anonymisation non reconnu'));
  }
})


router.post('/:table_name/masking', (req, res) => {
  console.log(req.body);
  if (req.body.typeAnonymisation == 'Character Masking') {
    let table = req.body.table;
    let columns = req.body.columns;
    try {
      columns.forEach((column) => {
        let command = 'python scripts/anonymisation/masking_manuel.py ' + table + " " + column.column + " " + column.containData;
        console.log(command)
        exec(command, (err, stdout, stderr) => {
        });
      });
      res.status(200).send(new Response(200, "", "Masking success"));
    } catch(err) {
      res.status(500).send(new Response(500, '', 'Erreur dans l execution du script python'));
    }
  } else {
    res.status(404).send(new Response(404, '', 'Type d\'anonymisation non reconnu'));
  }
})


router.post('/:table_name/randomisation', (req, res) => {
  console.log(req.body);
  if (req.body.typeAnonymisation == 'Randomisation') {
    let table = req.body.table;
    let type = req.body.typeRandomisation
    let columns = req.body.columns;
    try {
      columns.forEach((column) => {
        let command = 'python scripts/anonymisation/random_general_manuel.py ' + table + " " + type + " " + column.column + " " + column.containData;
        console.log(command)
        exec(command, (err, stdout, stderr) => {
        });
      });
      res.status(200).send(new Response(200, "", "Randomisation success"));
    } catch(err) {
      res.status(500).send(new Response(500, '', 'Erreur dans l execution du script python'));
    }
  } else {
    res.status(404).send(new Response(404, '', 'Type d\'anonymisation non reconnu'));
  }
})

function execCommand(res, command) {
  exec(command, (err, stdout, stderr) => {
    let responsePython;
    let json = eval(stdout);
    if (err) {
      responsePython = new PythonResponse(err.code, stdout);
      res
        .status(500)
        .send(
          new Response(
            500,
            responsePython.message + " : " + responsePython.status,
            ""
          )
        );
    } else {
      res.setHeader("content-type", "application/json");
      res.status(200).send(json);
    }
  });
}

module.exports = router;
