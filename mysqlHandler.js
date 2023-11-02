const mysql = require('mysql2');
const dotenv = require('dotenv');


dotenv.config({ path: './config.env' });


const mysqlConfig = {
    host: 'localhost',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}
console.log(mysqlConfig);

var pool = mysql.createPool(mysqlConfig);

module.exports.connect = function (cb) {
  return new Promise((resolve, reject) => {
    pool.on('connection', function (connection) {
            
            
            
         
          
      connection.on('error', function (err) {
        console.log("Error connecting to MYSQL")
    });
      connection.on('close', function (err) {
        console.log("Closing connection")
      });
    });
    resolve()
  })
}

async function executeQuery (query) {
  return new Promise((resolve, reject) => {
    try{
      pool.query(query, (err, res, f) => {
        if(err){
          reject(err)
        }
        else{
          resolve(res)
        }
      });
    }
    catch(err){
      reject(err)
    }
  })  
}

async function execSP(spName, params){
  return new Promise((resolve, reject) => {
    try{
      var paramPlaceHolder = ''
      if(params && params.length){
        for(var i = 0; i < params.length; i++){
          paramPlaceHolder += '?,'
        }
      }
      if(paramPlaceHolder.length){
        paramPlaceHolder = paramPlaceHolder.slice(0, -1)
      }
      pool.query(`CALL ${spName}(${paramPlaceHolder})`, params, (e, r, f) => {
        if(e){
          reject(e)
        }
        else{
          resolve(r[0])
        }
      });
    }
    catch(ex){
      reject(ex)
    }
  })
}
module.exports.executeQuery = executeQuery
module.exports.execSP = execSP
