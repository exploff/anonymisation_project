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
const INFO_CHECK_CONNECTION = "/database/check";

/**
 * {
 *  "tables": [
 *      "customers", 
 *      "..."
 *    ]
 * }
 */
const INFO_TABLES = "/tables";

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
const INFO_TABLE = "/:table_name";

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
const INFO_DATA_TABLE = "/data/:table_name/:limit";

const SUBMIT_ANONYMISATION_FORM_AUTOMATIQUE = "/form/anonymisation/automatique";


const DATA_ANONYMISATION_MANUEL = "/form/anonymisation/manuel";

module.exports = { INFO, 
    UPLOAD_FILE, 
    INFO_CHECK_CONNECTION, 
    INFO_TABLES, 
    INFO_TABLE, 
    INFO_DATA_TABLE, 
    SUBMIT_ANONYMISATION_FORM_AUTOMATIQUE, 
    DATA_ANONYMISATION_MANUEL };