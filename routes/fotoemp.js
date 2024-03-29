var express = require('express');
var router = express.Router();

var fotoasp = require('../controlador/fotoasp');

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
            res.redirect('/perfilasp');
        }
    }
}

router.get('/',noSesion, function(req,res,next){
    res.render('index');
});
router.post('/', function (req, res, next) {
    fotoasp.subirFotoEmp(req,res,next);
});

router.post('/foto', function (req, res, next) {
    fotoasp.mostrarFotoEmp(req,res,next);
});

router.post("/uploadPhoto",function(req,res,next){
    fotoasp.uploadAndroid(req,res,next);
});

router.post('/fotoE', function (req, res, next) {
    fotoasp.mostrarEmp(req,res,next);
});

module.exports = router; 
