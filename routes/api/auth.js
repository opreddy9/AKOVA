const express= require('express');
const router = express.Router()
const auth=require('../../middleware/auth')
const {check,validationResult}= require('express-validator');
const config=require('config')
const jwt=require('jsonwebtoken')
const User=require('../../models/User')
const bcrypt=require('bcryptjs')

// @route GET api/auth
// @desc Test route
// @access Public
router.get('/',auth,async (req,res)=> {
    try{
        const user=await User.findById(req.user.id).select('-password')
        //just sending it using res.send gives converting circular structure to json error
        if(user==null) return res.json({msg:"User doesn't exist"})
        res.json(user) 
        // console.log(user)

    }catch(err){
        console.error(err.message)
        res.status(500).send('server error')
    }
});

router.post('/',[
    check('email','Enter valid Email').isEmail(),
    check('password','password required').exists(),
],
async (req,res)=> {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password,profession}=req.body;
    try{
        let user=await User.findOne({email})
        if(!user){
            return res.status(400).json({error:[{msg:'Invalid credentials'}]})
        }

        const Ismatch=await bcrypt.compare(password,user.password)
        if(!Ismatch){
            console.log("password didnt match")
            return res.status(400).json({error:[{msg:'Invalid credentials'}]})
        }
        // const ismatch=await bcrypt.compare(profession,user.profession)
        // if(profession!=user.profession){
        //     console.log(profession+' '+user.profession)
        //     return res.status(400).json({error:[{msg:'Invalid credentials'}]})
        // }
        
        payload={
            user:{
                id:user.id,
                profession:user.profession
            }
        }
        jwt.sign(payload,config.get('jwtSecret'),{expiresIn:36000},(err,token)=>{
            if(err) throw err
            res.json({token})
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({msg:'server error'})
    }

});
router.get("/protectRoute", auth, async (req, res) => {
    const user = await User.findById(req.user.id).select("-password").select("-_id").select("-date").select("-__v").select("-email").select("-name");
    if (user) return res.status(200).json(user);
    else return res.status(400).json({ msg: "Invalid Authorization" });
});
module.exports=router;