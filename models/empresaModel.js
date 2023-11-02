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
      unique: true,
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




const Empresa = mongoose.model('Empresa', empresaSchema);

module.exports = Empresa;
