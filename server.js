const express= require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const encoder= bodyParser.urlencoded();

const PORT = process.env.PORT || 9000

//-------------------------------------    DEFINICION USE + EXPRESS      ------------------------------------
const app = express();

app.use(express.static(__dirname+'/'))
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());



//-------------------------------------    FIN DE DEFINICION DE ARCHIVOS ESTÁTICOS  ------------------------------------
//Conexión a MYSQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'webservice' 
});

//-------------------------------------    INICIO DE RUTAS      ------------------------------------
app.get('/', (req, res) =>{
    res.sendFile(__dirname+"/index.html");
})

//Registro de usuario
app.post('/registro', encoder, (req, res)=>{

    const sql='INSERT INTO persona SET ?';

    const usuarioObjeto = {
        dni: req.body.dni,
        nombreApellido: req.body.nombreApellido,
        direccion: req.body.direccion,
        email: req.body.email,
        telefono: req.body.telefono,
        genero: req.body.genero,
        localidad_codPostal:req.body.localidad_codPostal,
        clave: req.body.clave,
        fechaNacimiento: req.body.fechaNacimiento
    }
    
    connection.query(sql, usuarioObjeto, error=>{
        if (error) throw error;

        res.redirect("/Inicio");
    })
})


//Logeo de usuario
app.post("/acceso", encoder, function(req, res){

    email= req.body.email;
    clave= req.body.clave;

    connection.query("SELECT * FROM persona WHERE email=? AND clave=?",[email, clave], function(error, results, fields){
        if(results.length > 0){
            res.redirect("/Inicio");
        }else{
            res.redirect("/acceso");
        }
        res.end();
    })
})

//Modificar perfil de usuario
app.put('/modificarPerfil/:dni', encoder, (req,res)=>{
    let dni= req.params.dni;
    let nombreApellido= req.body.nombreApellido;
    let direccion= req.body.direccion;
    let email= req.body.email;
    let telefono= req.body.telefono;
    let localidad_codPostal= req.body.categoria_idCategoria;

    let sql= "UPDATE persona SET nombreApellido = ?, direccion = ?, email = ?, telefono = ?, localidad_codPostal = ? WHERE dni = ?";
    connection.query(sql, [dni, nombreApellido, direccion, email, telefono, localidad_codPostal], function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
})

//Alta de servicio
app.post('/altaServicio', (req, res)=>{
    let data = {nombre:req.body.nombre, descripcion:req.body.descripcion, precio:req.body.precio,
                experiencia:req.body.experiencia, categoria_idCategoria:req.body.categoria_idCategoria,
                persona_dni: req.body.persona_dni, persona_localidad_codPostal: req.body.persona_localidad_codPostal};
    let sql = "INSERT INTO servicio SET ?";
    connection.query(sql, data, function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
})

//Modificar servicio seleccionado
app.put('/modificarServicio/:idServicio', (req, res)=>{
  
    let idServicio= req.params.idServicio;
    let nombre= req.body.nombre;
    let descripcion= req.body.descripcion;
    let precio= req.body.precio;
    let experiencia= req.body.experiencia;
    let categoria_idCategoria= req.body.categoria_idCategoria;
    let persona_localidad_codPostal= req.body.persona_localidad_codPostal;

    let sql= "UPDATE servicio SET nombre = ?, descripcion = ?, precio = ?, experiencia = ?, categoria_idCategoria = ?, persona_localidad_codPostal = ? WHERE idServicio = ?";
    connection.query(sql, [idServicio, nombre, descripcion, precio, experiencia, categoria_idCategoria, persona_localidad_codPostal], function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
})

//Visualizar la lista de servicios
app.get('/verServicio/:idServicio', (req, res)=>{
    connection.query('SELECT * FROM servicio WHERE idServicio = ?', [req.params.idServicio], (error, fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    })
})

//Borrar servicio seleccionado
app.delete('/borrarServicio/:idServicio', (req, res)=>{
    connection.query('DELETE FROM servicio WHERE idServicio = ?', [req.params.idServicio], function(error, fila){
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    })
})

//---------------------------------------- REDIRECCIONES DE PAGINAS ---------------------------------------------
//Cuando se crea el usuario o se logea el usuario que nos redirecciones
app.get("/Inicio", function(req, res){
    res.sendFile(__dirname+"/Inicio.html")
})

//Cuando el usuario se logea mal nos manda de nuevo a acceso
app.get("/acceso", function(req, res){
    res.sendFile(__dirname+"/acceso.html")
})
app.get("/perfilUsuario", function(req, res){
    res.sendFile(__dirname+"/perfil.html")
})
app.get("/servicios", function(req, res){
    res.sendFile(__dirname+"/registrarServicio.html")
})

//------------------------------------------    FIN DE RUTAS    ---------------------------------------------------

//Chequeo de la conexion
connection.connect(function(error){
    if(error) throw error
    else console.log("Conexión a la base de datos exitosa")
});

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));