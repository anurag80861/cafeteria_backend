const express=require('express');
const User=require('../models/user');

const router=express.Router();

router.get('/',async(req,res)=>{
    const users=await User.find().select('-cart');
    res.json(users);

});

router.get('/:id',async(req,res)=>{
    const user=await User.findById(req.params.id).select('-cart');
    res.json(user);
}
);  


router.post('/',async(req,res)=>{
    const user=new User(req.body);
    await user.save();
    res.status(201).json(user);
});

router.put('/:id',async(req,res)=>{
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(user);
    });

router.delete('/:id',async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.json({message:'User deleted'});
});
module.exports=router;