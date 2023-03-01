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

router.get('/:table_name/:limit/:pageIndex', (req, res) => {
  var table_name = req.params.table_name;
  var limit = req.params.limit;
  var pageIndex = req.params.pageIndex;
  if (table_name && limit && pageIndex) {
      let sendResult = {
          table: "",
          data: []
      }
      sendResult.table = table_name;
      var offset = limit * pageIndex;
      let command = 'python scripts/ner/detection.py ' + table_name + " " + process.env.DATABASE;
      execCommand(res, command);
  } else {
      res.status(404).send(new Response(404, 'Error 404 : Missing table name or limit', ''));
  }   
})

function execCommand(res, command) {
  exec(command, (err, stdout, stderr) => {
    let responsePython;
    //console.log("stdout : " + stdout);
    let json = eval(stdout);
    console.log(json);
    //console.log("stderr : " + stderr);
    //console.log("err : " + err)
    if (err) {
      responsePython = new PythonResponse(err.code, stdout);
      res.status(500).send(new Response(500, responsePython.message + " : " + responsePython.status, ''));
    } else {
      res.setHeader('content-type', 'application/json');
      res.status(200).send(json);
    }
  })
}

module.exports = router;