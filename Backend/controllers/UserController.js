const {User} = require('./../Model/UserModel');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

exports.Signup = async(req,res)=>
{
    const {username,password} = req.body;
    const userPresent = await User.findOne({username})

    if(userPresent?.username){
        res.send({"msg": "User already exist"})
    }
    else{
        try{
            bcrypt.hash(password, 4, async function(err, hash) {
                const user = new User({username,password:hash})
                console.log(user);
                await user.save()
                res.status(202).json({
                    "msg":"Sign up successful",
                    "user":user,
                })
            });
           
        }
       catch(err)
       {
            res.status(404).json({
                status:"Fail",
                Error: err,

            })
       }
    }
}

exports.Login = async(req,res)=>{
    
    const {username,password} = req.body;
    const user = await User.findOne({username}).lean()

    if(!user)
    {
        return res.status(400).json({
            message: 'User not found'
        })
    }      
    if(await bcrypt.compare(password,user.password))
    {
      const Token = jwt.sign({
        id : user._id,
        username: user.username,
      }, process.env.JWT_SECRET)

      return res.status(200).json({
        status : "OK",
        accessToken: Token
    })
 }
 return res.status(400).json({
    status : "error",
    message: 'User not found'
})
}         