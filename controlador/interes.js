var con = require('../conexionsql/conexion');
var nodemailer = require('nodemailer');

exports.interesado = async function (req, res, next) {
    var uno = req.session.usuario.id
    var dos = req.session.asp.id

    const userData = [uno, dos];
    const sqlQuery = 'insert into interes (id_emp,id_asp) values (?,?)';


    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'aurantisoft@gmail.com',
                pass: 'Correoempresa'
            }
        });

        var mailOptions = {
            from: 'Employme <aurantisoft@outlook.com>',
            to: req.session.asp.email,
            subject: 'Prueba interes',
            text: 'A alguna empresa le haz interesado',
            html: "<h1> La empresa " + req.session.usuario.nom + " ha visitado tu perfil y parece ser que le interesó tu portafolio de trabajos </h1> " +
                "<a href='http://localhost:8080/empresa' target= '_blank'>Click aquí para saber más</a>"

        };
        transporter.sendMail(mailOptions, function (err, info) {
            console.log(err);
        });

        con.consultaBd(sqlQuery, userData);
        res.redirect('/aspirantes');

    } catch (err) {
        console.log(err);
        res.json('Ocurrió un error.');
    }
}


exports.intereses = async function (req, res, next) {

    var emp = req.session.usuario.id
    console.log(emp);
    const sqlQuery = "select id_emp,id_asp from interes where id_emp=?"
    try {
        var result = await con.consultaBd(sqlQuery, emp);
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.json("Ocurrió un error");
    }
}

exports.interesados = async function (req, res, next) {

        var device=req.body.device;
        if(device=="Android")
        {
            var e=req.body.id;
            var sqlQuery= 'select id_emp,email_emp,nom_emp,usu_emp,ruta_imge from perfilempresa natural join datosempresa natural join imgempresa where id_emp in (select id_emp from interes where id_asp=?)';
            var Query=" select ruta_imge from imgempresa where id_pemp=(select id_pemp from perfilempresa where id_emp=(select id_emp from interes where id_asp=?))"
        }
        else
        {
            var s= req.session.usuario;
            var e=s.id;
            var sqlQuery= 'select id_emp as iemp, ruta_imge as photo ,nom_emp as nomemp,email_emp as emaile, ruta_imge as photo from perfilempresa natural join datosempresa natural join imgempresa where id_emp in (select id_emp from interes where id_asp=?)';
        
        }
        const userData=[e];
        
    
        try{
                var emps = [];
             var obj= await con.consultaBd(sqlQuery,userData);
             for (var i=0;i<obj.length;i++)
{
emps[i]={"nom_emp":obj[i].nom_emp,"foto_emp":obj[i].ruta_imge,"email_emp":obj[i].email_emp,"id_emp":obj[i].id_emp}
}
             var result = {obj}
console.log(result); 
             res.json(emps);
    
        }catch(err)
        {
            console.log(err);
            res.json('Ocurrio un error');
        }
    }
