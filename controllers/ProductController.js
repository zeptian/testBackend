const {validationResult } = require('express-validator')
const Product = require('../models/Product')

tambah = async(req,res) => {
    const {name,description,quantity} = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({status:false, errors: errors.array() });
    }

    let oldProduct = await Product.findOne({name});
    if (oldProduct) {
        return res.status(200).json({
            status: false,
            message: "Nama Product telah terdaftar",
        })
    }

    let product = await Product.create({
        name,description,quantity
    });
    
    return res.status(201).json({status:true, data:product});
};

baca = async(req,res) => {
    const {id} = req.params.id
    let q = {}
    if(id){
        q = {_id:id}
    }
    let product = await Product.find(q);
      
    return res.status(201).json({status:true, data:product});
};

ubah = async(req,res) => {
    const {id} = req.params.id
    const {name,description,quantity} = req.body
    await Product.updateOne({_id:id},{name,description,quantity});
    let product = await Product.findOne({_id:id});
    return res.status(201).json({status:true, data:product});
};

hapus = async(req,res) => {
    const {id} = req.params.id
    await Product.deleteOne({_id:id});
      
    return res.status(201).json({status:true, message:'deleted'});
};

module.exports={tambah,baca,ubah,hapus}