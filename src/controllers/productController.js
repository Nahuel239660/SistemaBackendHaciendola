const { Product } = require('../models');  // Asegúrate de que la ruta sea correcta según tu estructura de proyecto

// Obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send('Error al obtener los productos: ' + error.message);
    }
};

// Obtener un producto específico por ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al obtener el producto: ' + error.message);
    }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
    try {
        const { title, description, sku, grams, stock, price, comparePrice, barcode } = req.body;
        const newProduct = await Product.create({ title, description, sku, grams, stock, price, comparePrice, barcode });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).send('Error al crear el producto: ' + error.message);
    }
};

// Actualizar un producto existente
exports.updateProduct = async (req, res) => {
    try {
        const { title, description, sku, grams, stock, price, comparePrice, barcode } = req.body;
        const [updated] = await Product.update(
            { title, description, sku, grams, stock, price, comparePrice, barcode },
            { where: { id: req.params.id } }
        );
        if (updated) {
            const updatedProduct = await Product.findByPk(req.params.id);
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al actualizar el producto: ' + error.message);
    }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Product.destroy({ where: { id } });
        if (deleted) {
            res.status(200).send('Producto eliminado');
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al eliminar el producto: ' + error.message);
    }
};
