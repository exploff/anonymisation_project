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

var mysql = require('mysql');

function initializeConnection(config) {
  function addDisconnectHandler(connection) {
    connection.on("error", function (error) {
      if (error instanceof Error) {
        if (error.code === "PROTOCOL_CONNECTION_LOST") {
          console.error(error.stack);
          console.log("Lost connection. Reconnecting...");
          initializeConnection(connection.config);
        } else if (error.fatal) {
          console.log(error);
          return null;
        }
      }
    });
  }
  var connection = mysql.createConnection(config);

  // Add handlers.
  addDisconnectHandler(connection);

  connection.connect();
  return connection;
}

var mysqlCon = initializeConnection({
              host: process.env.HOST,
              user: process.env.USER,
              password: process.env.PASSWORD,
              database: process.env.DATABASE
            });

function getMysqlConnection() {
  return mysqlCon;
}

router.get('/:table_name/:limit/:pageIndex', (req, res) => {
    
    var connection = getMysqlConnection();
    if (connection.state !== 'disconnected') {
        console.log(req.body);
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
            connection.query("SELECT * FROM " + table_name + " LIMIT " + offset + ", " + limit, function (err, result, fields) {
                try {
                  if (err) { throw err };
                  sendResult.data = result.map((item) => {
                    return item;
                  })
                  console.log(sendResult);
                  res.setHeader('content-type', 'application/json');
                  res.status(200).send(sendResult);
                } catch (error) {
                  res.status(400).send(error.message);
                }
            });
        } else {
            res.status(404).send(new Response(404, 'Error 404 : Missing table name or limit', ''));
        }
    } else {
        res.status(404).send(new Response(404, 'Error 404 : No connection', ''));
    }    
})

function execCommand(res, command) {
  exec(command, (err, stdout, stderr) => {
    let responsePython;
    console.log("stdout : " + stdout);
    console.log("stderr : " + stderr);
    console.log("err : " + err)
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