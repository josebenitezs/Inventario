const { Router } = require('express');
const Usuario = require('../models/Usuario');
const {validarUsuario} = require('../helpers/validar-usuario');

const router = Router();

router.post('/',  async function (req, res){
    try {

        const validaciones = validarUsuario(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones)
        }


        const existeUsuario = await Usuario.findOne({email: req.body.email });
        if (existeUsuario) {
            return res.status(400).send('Email ya existe')
        }
       console. log(req.body);

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();

        res.send(usuario);
        console.log(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al crear el usuario');
    }
  
});


router.get('/', async function(req, res){
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
   
});


router.put('/:usuarioId', async function(req, res){
    try {

        
        const validaciones = validarUsuario(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones)
        }

        let usuario = await Usuario.findById(req.params.usuarioId);
        if (!usuario) {
            return res.status(400).send('Usuario no existe');
        }
        const existeUsuario = await Usuario.
        findOne({ email: req.body.email, _id: {$ne: usuario._id}});
        if (existeUsuario) {
            return res.status(400).send('Email ya existe')
        }
       
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();

        res.send(usuario);
     
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar el usuario');
    }
  
});

router.get('/:usuarioId', async function(req, res ){
    try {
        const usuario = await Usuario.findById(req.params.usuarioId);
        if(!usuario){
            return res.status(404).send('Usuario no existe');
        }
        res.send(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar usuario');
        
    }
})


module.exports = router;