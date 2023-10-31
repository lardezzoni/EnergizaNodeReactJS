const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

// const User = require('./userModel');
// const validator = require('validator');

const empresaSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'A empresa precisa de um nome'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
    },
    slug: String,
    senha: {
      type: String,
      required: [true, 'A empresa precisa de uma senha'],
      maxlength: [40, "Senha não pode ser maior que 40 characteres"]
    },
    empresa: {
      type: String,
      required: [true, 'A empresa precisa de uma senha']
    },
    CNPJ: {
      type: Number,
      required: [true, 'A empresa precisa de um CNPJ'],
    },
    CEP: {
      type: Number,
      required: [true, "A empresa precisa de um CEP"]
    },
    endereço: {
      type: String,
      required: [true, "A empresa precisa de um endereço"]
    },
    numero: {
      type: Number,
      required: [true, 'A empresa precisa de um numero']
    },
    telefone: {
      type: Number,
      required: [true, 'A empresa precisa de um telefone']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);





// DOCUMENT MIDDLEWARE: runs before .save() and .create()


// tourSchema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// tourSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// tourSchema.pre('find', function(next) {
/*ourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt'
  });

  next();
});

tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
// tourSchema.pre('aggregate', function(next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

//   console.log(this.pipeline());
//   next();
// }); */

const Empresa = mongoose.model('Empresa', empresaSchema);

module.exports = Empresa;
