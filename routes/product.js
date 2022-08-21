const { query } = require('express');
const express = require('express')
const connection = require('../connection')
const router = express.Router();

router.post('/create',(req,res,next)=>{
    let product = req.body
    let query="insert into product (name,description,price) values(?,?,?)";
    connection.query(query,[product.name,product.description,product.price],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Product Added SuccessFully"})
        }
        else{
            return res.status(500).json(err);
        }
    });
});

router.get('/read',(req,res,next)=>{
    let query="select * from product";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results)
        }
        else{
            return res.status(500).json(err);
        }
    });
});

router.patch('/update/:id',(req,res,next)=>{
    const id = req.params.id;
    let product = req.body;
    var query = "update product set name=?,description=?,price=? where id=?";
    connection.query(query,[product.name,product.description,product.price,id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Product id does not found"});
            }
            return res.status(200).json({message:"Product updated Successfully"})
        }else{
            return res.status(500).json(err);
        }
    })
})

router.delete('/delete/:id',(req,res,next)=>{
    const id=req.params.id;
    var query="delete from product where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"product id does not found"})
            }
            return res.status(200).json({message:"product Deleted Successfully"});
        }else{
            return res.status(500).json(err);
        }
    })
})
module.exports=router;