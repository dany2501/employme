$(document).ready(()=>{

    //Botones y el modal

    var btn1=$('#complete');
    var modal=$('#modal1');
    var save=$('#guardar');
    var close=$('#cerrar')
    var file=$('#file')
    var pic=$("#picure");

    //Campos de texto y valores

    var correo=$('#correo');
    var sitio=$('#sitio');

    // var contra=$('#contra');
    // var contrac=$('#contrac');

    btn1.click(()=>{


        modal.slideDown("slow", function () {
        });
    });

    
    var foto=$('.information-photo');

    //Petición AJAX 
    $.ajax({
        url:'http://3.93.218.234/fotoemp/foto',
        method:'post',
        dataType:'json',
        success:function(response){
            console.log(response);
            foto.attr("src",response);

        },
    });
    
    $.ajax({

        url: 'http://3.93.218.234/updateE/show',
        method: 'get',
        dataType: 'json',
        success: function (response) {
            console.log(response);
            //Sitio
             if(response[0].sitio_pemp==null)
             {
                $('#site').val("Agregar");
                sitio.attr("placeholder","Agregar");
             }
             else
             {
                $('#site').val(response[0].sitio_pemp);
                sitio.attr("value",response[0].sitio_pemp)
             }

             //Ubicación
             if(response[0].ubi_pemp==null)
             {
                $('#ubi').val(" Agregar");
                $('#dir').attr("placeholder","Agregar");
             }
             else
             {
                $('#ubi').val(response[0].ubi_pemp);
                $('#dir').attr("value",response[0].ubi_pemp)
             }
             //Tel
             console.log(response[0].numtel_pemp);
             if(response[0].numtel_pemp==null)
             {
                $('#num').val(" Agregar");
                $('#tel').attr("placeholder","Agregar");
             }
             else
             {
                $('#num').val(response[0].numtel_pemp);
                $('#tel').attr("value",response[0].numtel_pemp)
             }

             
        $('#em').val(response[0].email_emp);
        correo.attr("value",response[0].email_emp)
            
            $('#site').val(response[0].sitio_pemp);

        

        if(response[0].des_emp==null)
        {
            edit.hide();
        }
        else 
        {
            $('#des').val(response[0].des_emp);
            $('#des').attr('readonly', true);;
            $('#save').hide();
        }
        
        }

    });
    
    //Para descripción
    
    var savebtn=$('#save');
    var txtarea=$('#des');

    savebtn.click(()=>{
        console.log(txtarea.val());
        $.ajax({

            url: 'http://3.93.218.234/updateE/add',
            method: 'put',
            dataType: 'json',
            data: {desc:txtarea.val()},
            success: function (response) { console.log(response) }

        });
        var url = "http://3.93.218.234/emp-profile";
            $(location).attr('href', url);
        alert('Datos actualizados');

    });

    //Editar descripción
    var edit=$('#edit')

    edit.click(()=>{
        
        $('#des').attr('readonly', false);
        $('#save').show();
        edit.hide();

    });


    

var nt=$('#tel');
var dr=$('#dir');

//Para demás datos
    save.click(()=>{
        var data={mail:correo.val(),sitio:sitio.val(),num:nt.val(),dir:dr.val()}
        console.log(data);
        if(correo.val()=="" && sitio.val()=="")
        {
            modal.slideUp("fast",()=>{});
            console.log("Campos vacíos");
        }
        else {
        $.ajax({

            url: 'http://3.93.218.234/updateE',
            method: 'put',
            dataType: 'json',
            data: data,
            success: function (response) { console.log(response) }

        });
        var url = "http://3.93.218.234/emp-profile";
            $(location).attr('href', url);
        alert('Datos actualizados');
        correo.val("");
        sitio.val("");
        nt.val("");
        dr.val("");
        modal.slideUp("fast",()=>{});
    }
    });

    close.click(()=>{
        modal.slideUp("fast",()=>{});
    });


    //Para fotos.

   

    file.on('change', ()=>{
        $("#picture").submit();
    });
        
    });