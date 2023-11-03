const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const mysql = require('mysql2')
const sql = require("../mysqlHandler")

exports.getAllEmpresas = catchAsync(async(req,res,next)=>{
  const query = "SELECT * FROM empresas;"

  var response = await sql.executeQuery(query);
  res.status(200).json({
    status: 'success',
    response
  });
})


exports.getEmpresa = catchAsync(async(req,res,next)=>{
  
 
  let query = `SELECT * FROM empresas WHERE CNPJ='${req.body.CNPJ};'`
 
  var response = await sql.executeQuery(query);
  if(!response){
    res.status(304).json({
      status: 'fail',
      error: "Empresa não encontrada"
    })
  }
  res.status(200).json({
    status: 'success',
    response
  });
})


exports.createEmpresa = catchAsync(async (req,res,next)=>{
  //segue a formatação do CNPJ
  const regExpCNPJ = /^\d{2}\.\d{3}.\d{3}\/\d{4}\-\d{2}$/gm;
  //CEP de 5 digitos e seguido por 3 digitos
  const regExpCEP = /^\d{5}\-\d{3}$/gm;
  //todos caracteres menos especiais
  const regExpEndereco = /^[a-zA-Z]{0,5}$/gm;
  const regExpNumero = /^\d{3}$/gm;
  //telefone 5 digitos '-' e quatro digitos
  const regExpTelefone=/^\d{5}\-\d{4}$/gm;
  //regex for email
  const regExpEmail =/^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gm;

  switch(false){
    case regExpCNPJ.test(req.body.CNPJ):{
      let newError = new AppError("CNPJ na formatação errada", 400);
      return newError.response(res);
    }
    case regExpCEP.test(req.body.CEP):{
      let newError = new AppError("CEP na formatação errada", 400);
      return newError.response(res);
    }
    case regExpNumero.test(req.body.numero):{
      let newError = new AppError("Número na formatação errada", 400);
      return newError.response(res);
    }
    case regExpTelefone.test(req.body.telefone):{
      let newError = new AppError("Telefone na formatação errada", 400);
      return newError.response(res);
    }
    case regExpEndereco.test(req.body.endereço):{
      let newError = new AppError("Endereço na formatação errada", 400);
      return newError.response(res);
    }
    case regExpEmail.test(req.body.email):{
      let newError = new AppError("Email na formatação errada", 400);
      return newError.response(res);
    }
  }
  
  let query = `INSERT INTO empresas(nome,senha,empresa,CNPJ,CEP,endereco,numero,telefone,email) VALUES ('${req.body.nome}', '${req.body.senha}', '${req.body.empresa}', '${req.body.CNPJ}', '${req.body.CEP}', '${req.body.endereço}', '${req.body.numero}', '${req.body.telefone}', '${req.body.email}');`
  try{
    const responseQ = await sql.executeQuery(query);
  }catch(err){

    let newError = new AppError("Erro adicionando empresa na database", 400);
    return newError.response(res);

  }
  res.status(201).json({
    status: 'success',
    data: {
      data: "Empresa adicionada"
    }
  });
})
exports.updateEmpresa = catchAsync(async(req,res,next)=>{

  console.log(req.body);
  let columns = Object.keys(req.body.data);
  let values = Object.values(req.body.data);
  let fixArrayValues = [];
  let fixArrayColumn = [];
  // retirar os valores vazios do JSON
  for (let i = 0; i < values.length; i++) {
    if(values[i]!=''){
      if(columns[i]=="CNPJ"){

      }
      else{
        console.log(values[i])
        let str = values[i];
        fixArrayValues.push(str);
        let str2 = columns[i];
        fixArrayColumn.push(str2);
      }
      
    }
    else{}
  } 

  let query = "UPDATE empresas SET ";
  
  for (let i = 0; i < fixArrayValues.length; i++) {
      query += fixArrayColumn[i];
      query += "=";
      query += "'";
      query += fixArrayValues[i];
      query += "'";
      if (i !== fixArrayValues.length - 1) {
          query += ",";
      }
  }
  
  query+= ` WHERE CNPJ='${req.body.data.CNPJ}';`;
  //console.log(query);

  let response = await sql.executeQuery(query);
  if(response.affectedRows==0){
    let newError = new AppError("Empresa não encontrada", 400);
    return newError.response(res);
  }
  else{
    res.status(200).json({
      status: 'success'
    })
  }
})
exports.deleteEmpresa = catchAsync(async(req,res,next)=>{

  let query = `DELETE FROM empresas WHERE CNPJ='${req.body.CNPJ}'`
  let response = await sql.executeQuery(query)

  if(response.affectedRows==0){
    let newError = new AppError("Empresa não encontrada", 400);
    return newError.response(res);
  }
  else{
    res.status(200).json({
      status: 'success'
    })
  }

  }
  
)
 