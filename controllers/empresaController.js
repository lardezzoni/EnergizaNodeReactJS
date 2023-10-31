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
exports.updateEmpresa = factory.updateOne(Empresa);
exports.deleteEmpresa = factory.deleteOne(Empresa); 
 /*
exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1; // 2021

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: {
        _id: 0
      }
    },
    {
      $sort: { numTourStarts: -1 }
    },
    {
      $limit: 12
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan
    }
  });
}); */