const express=require('express')
const jwt=require('jsonwebtoken')
const axios=require('axios')
const User=require('../models/User')
const router=express.Router();//initializing the router


//importing the client secrets from the environment variables

const CLIENT_ID=process.env.CLIENT_ID
const CLIENT_SECRET=process.env.CLIENT_SECRET
const JWT_SECRET=process.env.JWT_SECRET

//STep 1: REdirecting to the github
router.get('/github',(req,res)=>{
    const redirectUrl=`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user`;
    res.redirect(redirectUrl);
});

router.get('/github/callback',async(req,res)=>{
    const code=req.query.code;

    try{
        const tokenRes = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
              code,
            },
            {
              headers: {
                accept: 'application/json',
              },
            }
          );

        const accessToken=tokenRes.data.access_token;


        const userRes= await axios.get('https://api.github.com/user',{
            headers:{
                Authorization: `token ${accessToken}`,
            }
        });
        const { id, login, avatar_url, email } = userRes.data;


        let user=await User.findOne({githubId:id});

        if(!user){
            user= new User({
                githubId:id,
                username:login,
                avatar:avatar_url,
                email:email || '', //empty for the private accounts
            })
            await user.save();
        }



        const token=jwt.sign(
            {id:user._id},
            JWT_SECRET,
            {expiresIn:'7d'});
        
        res.redirect(`http://localhost:5000?token=${token}`)



        }catch(err){
            console.log(err);
            res.status(500).json({
                error:"Gtihub auth failed"
            })
        }

});

module.exports=router;