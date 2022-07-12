const express = require('express')
const {body, validationResult } = require('express-validator')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const router = express.Router()
const auth = require('../middleware/auth')
const AuthController = require('../controllers/AuthController')
const ProductController = require('../controllers/ProductController')

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

router.post('/signup',AuthController.signup);
router.post('/login',AuthController.login);

router.get('/product/:id',auth,ProductController.baca)
router.get('/product',auth,ProductController.baca)

router.post('/product',
    //validation
    body('name').isLength({min:1}),
    body('description').isLength({min:1}),
    body('quantity').isNumeric(),

    auth,ProductController.tambah)

router.put('/product/:id',
    //validation
    body('name').isLength({min:1}),
    body('description').isLength({min:1}),
    body('quantity').isNumeric(),
    
    auth,ProductController.ubah)

router.delete('/product:id',auth,ProductController.hapus)

module.exports = router