const express=require('express');
const Dish=require('../models/dish');

const router=express.Router();

router.get('/',async(req,res)=>{
    const dishes=await Dish.find().populate('counter');
    res.json(dishes);

});

router.post('/',async(req,res)=>{
    const dish=new Dish(req.body);
    await dish.save();
    res.status(201).json(dish);
});

router.put('/:id',async(req,res)=>{
    const dish
    =await Dish.findByIdAndUpdate(req.params.id,req.body,{new:true});

    res.json(dish);
    }
);

router.delete('/:id',async(req,res)=>{
    await Dish.findByIdAndDelete(req.params.id);
   res.status(204).send();
}
);

module.exports=router;