const express = require('express');
const router = express.Router();
const varPath = require('../path.js');

class Response {
    constructor(status, error, success) {
        this.status = status,
        this.error = error,
        this.success = success
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

router.get('/', (req, res) => {
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
  
router.get(varPath.INFO_CHECK_CONNECTION, (req, res) => {
    try {
      let connection = getMysqlConnection();
      if (connection.state !== 'disconnected') {
        connection.query("SHOW VARIABLES LIKE 'version'", function (err, result, fields) {
          if (err) throw err;
          let data = Object.values(JSON.parse(JSON.stringify(result)));
          data.push({ "host": process.env.HOST, "user": process.env.USER, "password": process.env.PASSWORD, "database": process.env.DATABASE });
          console.log(data);
          res.setHeader('content-type', 'application/json');
          res.status(200).send(data);
        });
      } else {
        res.status(400).send("No connection");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
})
  
router.get(varPath.INFO_TABLES, (req, res) => {
      
    var connection = getMysqlConnection();
    let sendResult = {
      tables: []
    }
    if (connection.state !== 'disconnected') {
      connection.query("SELECT Table_name as table_name from information_schema.tables where table_schema = '" + process.env.DATABASE +"'", function (err, result, fields) {
        try {
          if (err) { throw err };
          sendResult.tables = result.map((item) => {
            return item.table_name;
          })
          res.setHeader('content-type', 'application/json');
          res.status(200).send(sendResult);
        } catch (error) {
          res.status(400).send(error.message);
        }
      });
    } else {
      res.status(400).send("No connection");
    }
});
  
router.get( varPath.INFO_TABLE, (req, res) => {
    var connection = getMysqlConnection();
    if (connection.state !== 'disconnected') {
      let sendResult = {
        table: "",
        columns: []
      }
      var table_name = req.params.table_name;
      if (table_name) {
        sendResult.table = table_name;
        connection.query("SHOW COLUMNS FROM " + table_name, function (err, result, fields) {
          try {
            if (err) { throw err };
            sendResult.columns = result.map((item) => {
              return { "name": item.Field, "type": item.Type};
            })
            res.setHeader('content-type', 'application/json');
            res.status(200).send(sendResult);
          } catch (error) {
            res.status(400).send(error.message);
          }
        });
      } else {
        res.status(400).send("Missing table name");
      }
    } else {
      res.status(400).send("No connection");
    }
})
  
router.get(varPath.INFO_DATA_TABLE, (req, res) => {
    var connection = getMysqlConnection();
    if (connection.state !== 'disconnected') {
  
      let sendResult = {
        table: "",
        data: []
      }
      var table_name = req.params.table_name;
      var limit = req.params.limit;
      if (table_name && limit) {
        sendResult.table = table_name;
        
        connection.query("SELECT * FROM " + table_name + " LIMIT " + limit, function (err, result, fields) {
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
        res.status(400).send("Missing table name or limit");
      }
    } else {
      res.status(400).send("No connection");
    }
})

module.exports = router;