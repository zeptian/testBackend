const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

login = async (req, res) => {
    const { username, password } = req.body

    if (!(username && password)) {
        res.status(400).send({success:false, message:"All input is required"});
    }
    const user = await User.findOne({username})
    
    if(user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign(
            { user_id: user._id, username,role:user.role },
            process.env.TOKEN_KEY,
            { expiresIn: "2h", }
        );
        data = {user} 
        data.token = token
        res.status(200).json({status:true, data:data, message:"Berhasil Login"});
    }else{
        res.status(400).send({status:false, message:"username atau password salah"});
    }
}

signup = async (req,res) => {
    const {username,password,role} = req.body
    if (!(username && password)) {
        return res.status(400).json({
            status: false,
            error: "harus menambahkan parameter",
        })
    }
    const oldUser = await User.findOne({username});
    if (oldUser) {
        return res.status(200).json({
            status: false,
            message: "username telah terdaftar. Silahkan login untuk memulai",
        })
    }

    encryptedPassword = await bcrypt.hash(password, 10);
    var user = await User.create({
        username:username,
        password: encryptedPassword,
        role:role
    });
    
    const tok = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {expiresIn: "2h",}
    );
    user.token = tok
    return res.status(201).json({status:true, data:user,token:tok});
}

module.exports={login,signup}
