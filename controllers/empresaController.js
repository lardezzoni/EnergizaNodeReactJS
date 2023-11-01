const Empresa = require('../models/empresaModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');


exports.getAllEmpresas = factory.getAll(Empresa);


exports.getEmpresa = catchAsync(async(req,res,next)=>{
  const empresa = await Empresa.find({CNPJ: req.params.CNPJ})
  
  console.log(empresa);
  res.status(200).json({
    status: 'success',
    data: {
      empresa
    }
  });
})


exports.createEmpresa = catchAsync(async (req,res,next)=>{
  const doc = await Empresa.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
})
exports.updateEmpresa = catchAsync(async(req,res,next)=>{
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
  const doc = await Empresa.deleteOne({CNPJ: req.params.CNPJ}, function(err, obj){
    if(err){
      return new AppError("Empresa não encontrada", 404)
    }
  })
  res.status(200).json({
    status: 'success'
  })
})
 