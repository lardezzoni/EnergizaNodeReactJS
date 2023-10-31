const express = require('express');
const empresaController = require('../controllers/empresaController');
const authController = require('../controllers/authController');

const router = express.Router();
console.log("EM EMPRESA")

// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews





router
  .route('/test')
  .get(empresaController.getAllEmpresas)
  .post(
    authController.protect,
    empresaController.createEmpresa
  );

router
  .route('/:CNPJ')
  .get(empresaController.getEmpresa)
  .patch(
    authController.protect,
    empresaController.updateEmpresa
  )
  .delete(
    authController.protect,
    empresaController.deleteEmpresa
  );

module.exports = router;
