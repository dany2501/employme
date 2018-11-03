var express = require('express');
var router = express.Router();

var noSesion = function(req, res, next){
    if(!req.session.usuario){
        next();
        console.log("No hay sesión");
    }else{ 
        
        var ds=req.session.empresas;
        console.log(ds);
        res.render('asp-interested',{empresas:ds});
    } 
}

router.get('/',noSesion, function(req,res,next){
    
});
   
module.exports = router; 