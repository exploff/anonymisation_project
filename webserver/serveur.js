const varPath = require('./path.js');
const express = require('express');
const cors = require('cors');
const app = express();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './uploads' });
var path = require('path');
var fs = require('fs');
const bodyParser = require('body-parser');

require('dotenv').config({path: '../.env'});

app.use(bodyParser.text());
app.use(express.json());
app.use(cors());
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

app.post(varPath.UPLOAD_FILE, multipartMiddleware, (req, res) => {
  console.log("Call to " + varPath.UPLOAD_FILE);
  var file = req.files.file;
  if (file) {
    fs.rename(file.path, '../deploy/' + file.name, function(error) {
      if (error) {
        res.status(500).send({ error: 'Error renaming file' });
      } else {
        res.status(200).send({ success: true });
      }
    });
  } else {
    res.status(400).send({ error: 'No file found' });
  }
});

app.get(varPath.INFO, (req, res) => {
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

app.get(varPath.INFO_CHECK_CONNECTION, (req, res) => {
  try {
    let connection = getMysqlConnection();
    if (connection.state !== 'disconnected') {
      connection.query("SHOW VARIABLES LIKE 'version'", function (err, result, fields) {
        if (err) throw err;
        res.setHeader('content-type', 'application/json');
        res.status(200).send(result);
      });
    } else {
      res.status(400).send("No connection");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
})

app.get(varPath.INFO_TABLES, (req, res) => {
    
  var connection = getMysqlConnection();
  let sendResult = {
    tables: []
  }
  if (connection.state !== 'disconnected') {
    connection.query("SHOW TABLES", function (err, result, fields) {
      try {
        if (err) { throw err };
        sendResult.tables = result.map((item) => {
          return item.Tables_in_db;
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

app.get(varPath.INFO_TABLE, (req, res) => {
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

app.get(varPath.DATA_TABLE, (req, res) => {
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

app.listen(3000, () => {
  console.log('Server started');
})