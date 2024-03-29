var express = require('express');
var router = express.Router();

var loginemp = require('../controlador/loginemp');

    var noSesion = function(req, res, next){
        if(!req.session.usuario){
            next();
        }else{
            res.redirect('/aspirantes');
        }
    }
    
    
    router.get('/',noSesion, function(req,res,next){
        res.render('index');
    })
    router.post('/',function(req,res,next){
        loginemp.iniciarSesion(req, res, next);
    });

   
module.exports = router; 
