const express=require('express'),
views=express.Router();

//view routes
views.get('/',(req,res)=>{
    res.render('index',{title:'Landing page'})
});
views.get('/laboratory',(req,res)=>{
    res.render('playground',{title:'Laboratory'})
});
views.use((req,res)=>{
    res.status(404).render('notfound',{title:'Not found'})
})

module.exports=views
