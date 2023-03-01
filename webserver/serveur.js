const varPath = require('./path.js');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();


app.use(cors());
app.use(bodyParser.json());

const databaseInfo = require('./request/databaseInfo.js');
app.use(varPath.INFO, databaseInfo);

const dumpSql = require('./request/dumpSql.js');
app.use(varPath.UPLOAD_FILE, dumpSql);

const automatique = require('./request/automatique.js');
app.use(varPath.SUBMIT_ANONYMISATION_FORM_AUTOMATIQUE, automatique);

const manuel = require('./request/manuel.js');
console.log(manuel.stack[0].route);
app.use(varPath.DATA_ANONYMISATION_MANUEL, manuel);

app.listen(3000, () => {
  console.log('Server started');
})