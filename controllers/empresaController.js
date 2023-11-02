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
  
  let query = `INSERT INTO empresas VALUES '${req.body.name}', '${req.body.senha}', '${req.body.empresa}'. '${req.body.CNPJ}'
  , '${req.body.CEP}', '${req.body.endereço}', '${req.body.numero}', '${req.body.telefone}', '${req.body.email}'`

  const responseQ = await sql.executeQuery(query);
  console.log(responseQ);

  res.status(201).json({
    status: 'success',
    data: {
      data: responseQ
    }
  });
})
exports.updateEmpresa = catchAsync(async(req,res,next)=>{
  console.log("HERE2222222222")

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
 