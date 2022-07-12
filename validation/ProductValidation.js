const {body, validationResult } = require('express-validator')

const product = [
    body('name').isLength({min:1}),
    body('description').isLength({min:1})
]

module.exports = product;