const path = require('./path.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config({path: '../.env'});

app.use(bodyParser.text());
app.use(express.json());

function getMysqlConnection() {
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });

  return con;
}

app.post(path.UPLOAD_FILE, (req, res) => {
  //TODO
  console.log(req.body);
  res.send('ok');
});

app.get(path.INFO, (req, res) => {
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

app.get(path.INFO_CHECK_CONNECTION, (req, res) => {
  try {
    let con = getMysqlConnection();
    con.connect(function(err) {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.status(200).send("Connection to database is ready");
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
})

app.get(path.INFO_TABLES, (req, res) => {
    
  var connection = getMysqlConnection();
  let sendResult = {
    tables: []
  }

  //Catch error if connection failed
  connection.connect((err) => {
    try {
      if (err) { throw err };  
      
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
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
});

app.get(path.INFO_TABLE, (req, res) => {
  var connection = getMysqlConnection();

  let sendResult = {
    table: "",
    columns: []
  }
  var table_name = req.params.table_name;
  if (table_name) {
    sendResult.table = table_name;
    connection.connect((err) => {
      try {
        if (err) { throw err };  
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
      } catch (error) {
        res.status(400).send(error.message);
      }
    })
  } else {
    res.status(400).send("Missing table name");
  }
})

app.get(path.DATA_TABLE, (req, res) => {
  var connection = getMysqlConnection();

  let sendResult = {
    table: "",
    data: []
  }
  var table_name = req.params.table_name;
  var limit = req.params.limit;
  if (table_name && limit) {
    sendResult.table = table_name;
    connection.connect((err) => {
      try {
        if (err) { throw err };  
        connection.query("SELECT * FROM " + table_name + " LIMIT " + limit, function (err, result, fields) {
          try {
            if (err) { throw err };
            sendResult.data = result.map((item) => {
              return item;
            })
            res.setHeader('content-type', 'application/json');
            res.status(200).send(sendResult);
          } catch (error) {
            res.status(400).send(error.message);
          }
        });
      } catch (error) {
        res.status(400).send(error.message);
      }
    })
  } else {
    res.status(400).send("Missing table name or limit");
  }

})

app.listen(3000, () => {
  console.log('Server started');
})