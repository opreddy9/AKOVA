const express=require('express')
const {check,validationResult}=require('express-validator')
const auth=require('../../middleware/auth')
const Idea=require('../../models/idea')
const PostProblem=require('../../models/postproblem')
const idea = require('../../models/idea')
const investmentask=require('../../models/investmentask')
const checkObjectId=require('../../middleware/checkObjectId')
const router=express.Router()
{
    //see whether guy updating the posts/problems/dates are the guy that was admin to the posts
}
//@route api/idea/:postid 
//desc Post an idea for specific problem
router.post('/:postid',[auth,checkObjectId('postid'),[
    check('description','Description is required ').not().isEmpty(),
]],async (req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let post = await PostProblem.findById(req.params.postid);
        if (!post) {
            return res.status(400).json({ errors: [{ msg: "No problem exists" }] });
        }
        let user = await User.findById(req.user.id);
        if(req.user.profession!=='student'){
            return res.status(400).json({
                errors: [
                  { msg: "You are not allowed to post idea for this problem" },
                ],
            });
        }
        let alreadyposted=await idea.find({
            user:req.user.id,
            problem:req.params.postid,
        })
        //length of alreadyposted reply check by logging
        if(alreadyposted && alreadyposted.length!=0){
            return res.status(400).json({
                errors: [{ msg: "Only one idea can be posted by user to a problem" }],
            });
        }
        let ideaposting=new idea({
            user:req.user.id,
            problem:req.params.postid,
            description:req.body.description,
            attachments:req.body.attachments,
        })
        let ideasaved=await ideaposting.save();
        res.status(200).json(ideasaved);
    }catch(err){
        res.status(500).send('Server Error');
    }
});
//@route api/idea/allideas
//desc View all ideas of student
router.get('/allideas',[auth],async (req,res)=>{
    try{
        let user=await Idea.find({user:req.user.id}).populate('problem',[
            "title",
            "technologies",
            'description',
            "domain",
            "outcome",
            "dueDate",
        ])
        if(!user || user.length==0){
            return res.status(400).json({ errors: [{ msg: "You haven't posted any ideas" }] });
        }
        res.status(200).json(user);
    }
    catch(err){
        console.log(err.message)
        res.status(500).send("Server error")
    }
});
//@route /api/idea/allideas/:postid
//desc select all ideas for a specific problem
router.get('/allideas/:postid',[auth,checkObjectId('postid')], async (req,res)=>{
    try{
        let problem=await PostProblem.findById(req.params.postid);
        if(!problem){
            return res.status(400).json({ errors: [{ msg: "No such problem exist" }] });
        }
        let ideas=await Idea.find({problem:req.params.postid}).populate("user",[
            "name",
            "email",
        ]);
        if(!ideas|| ideas.length==0){
            return res.status(400).json({ errors: [{ msg: "No ideas are posted yet...Be the first to do" }] });
        }
        res.status(200).json(ideas);
    }
    catch(err){
        
        res.status(500).send('Server error')
    }
});
//@route /api/idea/getpost/:postid
//desc Get an problem by it's id(get each individual problem)
router.get('/getpost/:postid',[auth,checkObjectId('postid')], async (req,res)=>{
    try{
        let post= await PostProblem.findById(req.params.postid);
        if(!post){
            return res.status(400).json({
                msg:"No problem is posted by any entrepreneur"
            })
        }
        res.status(200).json(post)
    }
    catch(err){
        console.log(err.message)
        res.status(500).send('Server error')
    }
})
//@route /api/idea/update/:id
//desc update an id
router.put('/updateapprove/:id', [auth,checkObjectId('id')], async (req, res) => {
    try {
        if (req.user.profession !== 'entrepreneur') {
            return res.status(400).json({
                msg: "Only entrepreneurs can approve ideas"
            });
        }
        const updatedIdea = await Idea.findById(req.params.id);
        if (!updatedIdea ) {
            return res.status(404).json({
                msg: "Idea not found"
            });
        }
        updatedIdea.status="approved";
        await updatedIdea.save();
        res.status(200).json(updatedIdea);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
//@route /api/idea/Entrepreneurprofile
//desc Get Investor profile
router.get('/Entrepreneurprofile',[auth],async (req,res)=>{
    try {
        if (req.user.profession !== 'entrepreneur') {
            return res.status(400).json({
                msg: "Only entrepreneur can view his profile"
            });
        }
        const ideas=await investmentask.find({user:req.user.id});
        let response={
            TotalInvestmentsAsked:0,
            TotalInvestmentsAccepted:0,
            TotalInvestmentsInDueDiligence:0,
            TotalInvestmentsPending:0,
            TotalInvestmentAmount:0,
            TotalInvestmentAmountReceived:0
        }
        if(!ideas || ideas.length==0){
            return res.status(200).json(response);
        }
        ideas.forEach(idea=>{
            response.TotalInvestmentsAsked++;
            response.TotalInvestmentAmount+=idea.amount;
            if(idea.status===2){
                response.TotalInvestmentsAccepted++;
                TotalInvestmentAmountReceived+=idea.amount;
            }
            else if(idea.status===1){
                response.TotalInvestmentsInDueDiligence++;
            }
        });
        response.TotalInvestmentsPending=response.TotalInvestmentsAsked-response.TotalInvestmentsAccepted-response.TotalInvestmentsInDueDiligence;
        res.status(200).json(response);
    } catch (err) {
        res.status(500).send('Server error');
    }
})
module.exports=router