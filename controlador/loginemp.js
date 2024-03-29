var db =require('../conexionsql/conexion');


exports.iniciarSesion = async function (req, res, next) {
    var settings = {password: 'HECD010225HMCRRNA6'}

    var device = req.body.device;
    var flag = false;
    var user=req.body.usu_e;
    var pass =req.body.pass_e;
    const sqlData = [user, pass];

    for (var i = 0; i < user.length; i++) {
        if (user[i] == "@") {
            flag = true
        }
    }

    if( flag==true)
        {
            var sqlQuery = "SELECT id_emp,(AES_DECRYPT(usu_emp, '"+settings.password+"')) as usu_emp,(AES_DECRYPT(psw_emp, '"+settings.password+"')) as psw_emp,nom_emp,email_emp FROM datosempresa WHERE email_emp = ? AND (AES_DECRYPT(psw_emp, '"+settings.password+"'))= ?";
        }
        else
        {
            var sqlQuery = "SELECT id_emp,(AES_DECRYPT(usu_emp, '"+settings.password+"')) as usu_emp,(AES_DECRYPT(psw_emp, '"+settings.password+"')) as psw_emp,nom_emp,email_emp FROM datosempresa WHERE (AES_DECRYPT(usu_emp, '"+settings.password+"')) = ? AND (AES_DECRYPT(psw_emp, '"+settings.password+"'))= ?";
        }
    

    try {
	 var foto="select ruta_imge from imgempresa where id_pemp=(select id_pemp from perfilempresa where id_emp=?)";
        //Se consulta a la bd para buscar el usuario de la empresa 
        var result = await db.consultaBd(sqlQuery, sqlData);

 var resfoto=await db.consultaBd(foto,result[0].id_emp);
        if (req.body.usu_e == result[0].usu_emp || req.body.usu_e == result[0].email_emp  && req.body.pass_e == result[0].psw_emp) {
            var response = new Buffer.from(result[0].usu_emp, 'hex');
var psw = new Buffer.from(result[0].psw_emp,'hex');            

            if(device=="Android")
            {
                var obj = {
                    "id_emp": result[0].id_emp,
		    "foto_emp":resfoto[0].ruta_imge,
                    "psw_emp":psw.toString(),
                    "usu_emp": response.toString(),
                    "nom_emp":result[0].nom_emp,
                    "email_emp":result[0].email_emp
                }
                res.json(obj);
            }
            else
            {
                var obj = {
                    id: result[0].id_emp,
                    psw:psw.toString(),
                    usu: response.toString(),
                    nom:result[0].nom_emp,
                    email:result[0].email_emp
                }
                req.session.usuario = obj;
                const Query = "select id_pasp,id_asp,ruta_imga,nom_asp,FN_asp,sex_asp,email_asp from imgaspirante natural join perfilaspirante natural join datosaspirante";
                var asp=await db.consultaBd(Query);
                req.session.aspirantes=asp;
                res.redirect('/aspirantes');
            }

        } else if (result[0].usu_asp == undefined || result[0].psw_asp == undefined) {
            res.json('Datos incorrectos')
        }
    } catch (err) {
        console.log(err);
        res.redirect("/index");
    }
}


