/**
 * Project information
 */
const INFO = "/info";

/**
 * Upload a file in the folder deploy
 */
const UPLOAD_FILE = "/upload/file";

/**
 * Check if the connection to the database is ready
 */
const INFO_CHECK_CONNECTION = INFO + "/database/check";

/**
 * {
 *  "tables": [
 *      "customers", 
 *      "..."
 *    ]
 * }
 */
const INFO_TABLES = INFO + "/tables";

/**
 * {
 *  "table" : "customers",
 *  "columns" : [
 *    {
 *      "name":"name",
 *      "type":"varchar(255)"
 *    },
 *    {
 *      "name":"address",
 *      "type":"varchar(255)"
 *    }
 *  ]
 * }
 */
const INFO_TABLE = INFO + "/:table_name";

/**
 * {
 *  "table" : "customers",
 *  "data" : [
 *    {
 *      "name":"julien",
 *      "address":"toulouse"
 *    }
 *  ]
 * }
 */
const DATA_TABLE = "/data/:table_name/:limit";

module.exports = { INFO, UPLOAD_FILE, INFO_CHECK_CONNECTION, INFO_TABLES, INFO_TABLE, DATA_TABLE };