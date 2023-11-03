const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const sql = require("../mysqlHandler")
const bcrypt = require('bcryptjs');


const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (id, statusCode, res) => {
  const token = signToken(id);
  console.log("INSIDE TOKEN1")
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  }; 

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;


  res.status(statusCode).json({
    status: 'success',
    token
    
  });
};
exports.validateCorrect = catchAsync(async(req,res)=>{
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    let newError = new AppError("Você não está logado, por favor logue para ter acesso.", 400);
    return newError.response(res);
   
  }

  // verifique se o token é real
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  let query = `SELECT id FROM users WHERE id=${decoded.id}`
  const resultQ = await sql.executeQuery(query);

  if (resultQ.length == 0) {
    let newError = new AppError("Usuário não existe mais.", 400);
    return newError.response(res);
  }

  
  res.status(200).json({
    status: 'success',
    data:
      {validated: "success"}
    }
  );
})
exports.signup = catchAsync(async (req, res, next) => {
  if(req.body.password == req.body.passwordConfirm){
    const password = await bcrypt.hash(req.body.password, 12);
    let query = `INSERT INTO users(name,email,password) VALUES ('${req.body.name}','${req.body.email}','${password}');`
    const createUser = await sql.executeQuery(query);
    let query2 = "SELECT LAST_INSERT_ID();"
    let returnQuery = await sql.executeQuery(query2);

    // get unique id string
    let str = JSON.stringify(returnQuery[0]);
    
    const newStr = str.slice(str.indexOf(':') + 1);
    let resultId = newStr.slice(0, -1)

    createSendToken(resultId, 201, res);
    
  }
  else{
    let newError = new AppError("As senhas não são iguais", 400);
    return newError.response(res);
  }
 
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email || !password) {
    let newError2 = new AppError("Por favor digite o email e a senha", 400);
    return newError.response(res);
  }
  //see if email exists
  let query = `SELECT * FROM users WHERE email='${email}'`;
  let resultQuery = await sql.executeQuery(query);
  if(resultQuery.length==0){
    let newError = new AppError("Não foi encontrado o email", 400);
    return newError.response(res);
  }
  //decrypt password and compare
  const tryCrypt = await bcrypt.compare(password, resultQuery[0].password)
  
  //get id from database
  let queryId = `SELECT id FROM users WHERE email='${email}'`;
  resultQuery = await sql.executeQuery(queryId);
 
  if(tryCrypt){

    createSendToken(resultQuery[0].id, 200, res);
  }
  else{
    let error = new AppError("Password incorrect", 400);
    return error.response(res);
  }
});

exports.protect = catchAsync(async (req, res, next) => {
  //veja se o token é legitimo
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    let newError = new AppError("Você não está logado, por favor logue para ter acesso.", 400);
    return newError.response(res);
   
  }

  // verifique se o token é real
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  let query = `SELECT id FROM users WHERE id=${decoded.id}`
  const resultQ = await sql.executeQuery(query);

  if (resultQ.length == 0) {
    let newError = new AppError("Usuário não existe mais.", 400);
    return newError.response(res);
  }

  
  req.id = resultQ[0].id;
  next();
});





