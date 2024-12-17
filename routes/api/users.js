const express= require('express');
const router = express.Router()
const {check,validationResult}= require('express-validator');
const bcrypt=require('bcryptjs')
const config=require('config')
const jwt=require('jsonwebtoken')
const User=require('../../models/User');

// @route post api/users
// @desc register user
// @access Public
router.post('/',[
    check('name','name is required compulsory').not().isEmpty(),
    check('email','Enter valid email').isEmail(),
    check('profession','Enter valid profession').not().isEmpty(),
    check('password','Enter valid password of minimum length of 6').isLength({min:6}),
    check('password2','Enter valid password2 of minimum length of 6').isLength({min:6})
],
async (req,res)=> {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {name,email,password,password2,profession}=req.body;
    try{
        let user=await User.findOne({email})
        if(user){
            return res.status(400).json({error:[{msg:'user already exists'}]})
        }
        if(password==password2){
        user=new User({
            name,
            email,
            profession,
            password
        })
        const salt=await bcrypt.genSalt(10)
        user.password=await bcrypt.hash(password,salt)
        await user.save();
        
        payload={
            user:{
                id:user.id,
                profession:user.profession
            }
        }
        jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000},(err,token)=>{
            if(err) throw err
            res.json({token})
        })
    }
    else{
        return res.status(400).json({error:[{msg:'passwords do not match'}]})
    }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({msg:'server error'})
    }

});
module.exports=router;    