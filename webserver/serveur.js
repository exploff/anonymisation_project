const varPath = require('./path.js');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

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
app.use(cors());
app.use(bodyParser.json());

const databaseInfo = require('./request/databaseInfo.js');
app.use(varPath.INFO, databaseInfo);

const dumpSql = require('./request/dumpSql.js');
app.use(varPath.UPLOAD_FILE, dumpSql);

const suppression = require('./request/suppression.js');
app.use(varPath.SUBMIT_ANONYMISATION_FORM_AUTOMATIQUE_SUPPRESSION, suppression);

app.listen(3000, () => {
  console.log('Server started');
})