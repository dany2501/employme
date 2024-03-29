var express = require('express');
var router = express.Router();
const asp=require('../controlador/aspirantes');
var GitHub = require('../controlador/GH');
var video = require('../controlador/video');

var noSesion = function(req, res, next){
    if(req.body.device=="Android")
    {
        next();
    }
    else
    {
        if(!req.session.usuario){
            next();
        }else{ 
            next();
        } 
    }
    
}

router.get('/',noSesion,function(req,res,next){
console.log("En ruta");    
var obj=req.session.asp;
    console.log(obj);
     res.render('emp-aspirante',{id:obj.id,nombre:obj.nom,email:obj.email,sex:obj.sexo,f:obj.foto,edad:obj.edad,num:obj.num,cv:obj.cv});
});

router.get('/:id',noSesion,function(req,res,next){

asp.aspirantes(req,res);

});

router.post('/asps',noSesion,function(req,res,next){
    asp.getAspirantes(req,res,next)
});

router.put('/',noSesion,video.mostrarVideo);
router.post('/', noSesion,GitHub.githubAsp);




   
module.exports = router; 
