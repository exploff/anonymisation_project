const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './uploads' });
var fs = require('fs');
const varPath = require('../path.js');


class Response {
    constructor(status, error, success) {
        this.status = status,
        this.error = error,
        this.success = success
    }
}

router.post('/', multipartMiddleware, (req, res) => {
    var file = req.files.file;
    if (file) {
      fs.rename(file.path, '../deploy/' + file.name, function(error) {
        if (error) {
          res.status(500).send(new Response(500, 'Error renaming file', ''));
        } else {
          res.status(200).send(new Response(200, '', 'File uploaded successfully'));
        }
      });
    } else {
      res.status(400).send(new Response(400, 'No file found', ''));
    }
});

module.exports = router;