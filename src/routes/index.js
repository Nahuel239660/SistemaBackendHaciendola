const express = require('express');
const { productController } = require('../controllers'); // Importando desde el index
const router = express.Router();

router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;