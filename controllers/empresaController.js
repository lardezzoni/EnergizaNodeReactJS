const Empresa = require('../models/empresaModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const mysql = require('mysql2')
const sql = require("../mysqlHandler")

exports.getAllEmpresas = catchAsync(async(req,res,next)=>{
  const query = "SELECT * FROM empresas;"

  var response = await sql.executeQuery(query);
  console.log(response);
  res.status(200).json({
    status: 'success',
    data: {
      response
    }
  });
})


exports.getEmpresa = catchAsync(async(req,res,next)=>{
  const empresa = await Empresa.findOne({CNPJ: req.params.CNPJ})
  if(!empresa){
    res.status(304).json({
      status: 'fail',
      error: "Empresa não encontrada"
    })
  }
  console.log(empresa);
  res.status(200).json({
    status: 'success',
    data: {
      empresa
    }
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
  
  let query = `INSERT INTO empresas(nome,senha,empresa,CNPJ,CEP,endereco,numero,telefone,email) VALUES ('${req.body.nome}', '${req.body.senha}', '${req.body.empresa}', ${req.body.CNPJ}, ${req.body.CEP}, '${req.body.endereço}', ${req.body.numero}, ${req.body.telefone}, '${req.body.email}');`
  console.log(query);
  try{
    const responseQ = await sql.executeQuery(query);
    console.log(responseQ);
  }catch(err){
    console.log("INSIDE ERROR");
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

  
  const empresa = await Empresa.findOne({CNPJ: req.params.CNPJ})
  console.log("HERE")

  if(!empresa){
    res.status(304).json({
      status: 'fail',
      error: "Empresa não encontrada"
    })
  }
  console.log("HERE")
  console.log(req.body)
  const doc = await Empresa.updateOne({CNPJ: req.params.CNPJ}, req.body, (err,obj)=>{
    if(err){
      return new AppError("Empresa não encontrata", 404)
    }
  })
  res.status(200).json({
    status: 'success'
  })
})
exports.deleteEmpresa = catchAsync(async(req,res,next)=>{
  const empresa = await Empresa.findOne({CNPJ: req.params.CNPJ})

  if(!empresa){
    res.status(304).json({
      status: 'fail',
      error: "Empresa não encontrada"
    })
  }
  else{
    const doc = await Empresa.deleteOne({CNPJ: req.params.CNPJ}, function(err, obj){
      if(err){
        console.log("ISIDE DELETE")
        return new AppError("Empresa não encontrada", 404)
  
      }
    })
    res.status(200).json({
      status: 'success'
    })
  }
  
})
 