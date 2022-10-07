/* Este archivo contiene todos los manejadores de eventos de los inputs de formularios.
se debe incluir como parámetros:
- evento que es disparado por el input
- campos que están en el state, los que servirán como molde para ser actualizados en cada función.
Cada función retorna un objeto igual al state, que luego será actualizado en la función callback. */


export const handleChange = (event, fields_state) => { 
    // como inputs tiene el evento del input y los campos "fields_state" del state del componente
    const {value, type, name, checked} = event.target;

        if (type === "checkbox") {
            return Object.assign(fields_state, {
                [name]: checked
            });
        } else {
            //limit max value length for text fields
            return Object.assign(fields_state, {
                [name]: value
            });
        }
};