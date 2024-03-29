const validarInventario = (req) =>{
    const validaciones = [];

    if (!req.body.serial) {
        validaciones.push('Serial es requerido');
    }
    if (!req.body.modelo) {
        validaciones.push('Modelo es requerido');
    }
    if (!req.body.descripcion) {
        validaciones.push('Descripcion es requerido');
    }
    if (!req.body.color) {
        validaciones.push('Color es requerido');
    }
    if (!req.body.foto) {
        validaciones.push('Foto es requerido');
    }
    
    if (!req.body.fechaCompra) {
        validaciones.push('Fecha compra es requerido');
    }
    if (!req.body.precio) {
        validaciones.push('Precio es requerido');
    }
    if (!req.body.usuario) {
        validaciones.push('Usuario es reuerido');
    }
    if (!req.body.marca) {
        validaciones.push('Marca es requerido');
    }
    if (!req.body.tipoEquipo) {
        validaciones.push('Tipo equipo es reuerido');
    }
    if (!req.body.estadoEquipo) {
        validaciones.push('Estado equipo es requerido');
    }

    return validaciones;
    


}

module.exports = {
    validarInventario,
}