const express = require('express');
const empresaController = require('../controllers/empresaController');
const authController = require('../controllers/authController');

const router = express.Router();


router
  .route('/test')
  .get(empresaController.getAllEmpresas)
  .post(
    authController.protect,
    empresaController.createEmpresa
  );

router
  .route('/CNPJ')
  .post(empresaController.getEmpresa)
  .patch(
    authController.protect,

    empresaController.updateEmpresa
  )
  .delete(
    authController.protect,

    empresaController.deleteEmpresa
  );

module.exports = router;
