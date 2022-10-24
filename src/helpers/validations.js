/*Este archivo contiene todas las validaciones que se van a aplicar a los formularios
invalid-tooltip es el nombre de la clase que se debe asignar a los mensajes que serán mostrados al
usuario como feedback.
- Cada función requiere como parámetro:
1.- El evento que fué disparado por el input en el formulario. (name, type, value)
2.- Campos que están en el state, los que sirven de moldes para ser actualizados como salida de cada función.
** validateFormInputs requiere como parámetro el id del formulario que se quiere validar, para que se pueda
encontrar a través del DOM e iterar cada uno de sus elementos **
Cada función retorna un objeto igual al state, que luego será actualizado en la función callback.
*/

const handled_validations = ["email", "password"]; // tipos de inputs que se están validando.

// estas son las validaciones..
const validations  = {
    email: (email) => { // cuando el tipo del campo a ser validado es email.
        const reEmail = /\S+@\S+\.\S+/; //expresion regular para verificar email.

        if (reEmail.test(email)) {
            return {valid: true, msg: "ok"}
        }

        return {valid: false, msg: "Ingresa un correo electrónico válido"}
    },

    password: (passw) => { // cuando el tipo del campo a ser validado es password.
        const rePassw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; //expresion regular para verificar contraseña
        passw = typeof(passw) !== 'undefined' ? passw : "invalid";

        if (rePassw.test(passw)) {
            return {valid: true, msg: "ok"}
        }

        return {valid: false, msg: "La contraseña ingresada es insegura"}
    }
};


export const validate_field = (event, feedback_state) => {
    //
    let {name, type, value} = event.target;
    type = typeof(type) !== 'undefined' ? type : "text"; //default type for validations
    value = typeof(value) !== 'undefined' ? value : ""; //default value for validate

    if (handled_validations.includes(type)) {
        return Object.assign(feedback_state, {[name]: validations[type](value)})
    }
    return;
};


export const validateFormInputs = (form_id, feedback_state) => { // will return an object with a valid flag and a object of feedback.
    const ele = document.getElementById(form_id);
    let feedback = feedback_state;
    let all_valid = true;

    for (let i = 0; i < ele.length; i++ ) {

        const {name, type, value, required} = ele[i]; //se desestructura cada elemento del formulario.
        if (required) { //ignora los campos que no son requeridos.
            
            if (handled_validations.includes(type)) {
                const rev = validations[type](value);
                feedback[name] = rev;
                all_valid = all_valid && rev.valid;

            } else if (value.trim() === "") { // si el campo está vacío:
                feedback[name] = {valid: false, msg: "Por favor, completa este campo"};
                all_valid = false;
            }
        }
    }

    return({valid: all_valid, feedback: Object.assign(feedback_state, feedback)});
};


export const noSpace = (event) => {
    if (event.charCode === 32) {
        event.preventDefault();
    }
}

export const codeRestrict = (event) => {
    const max_length = 6;
    if (event.charCode === 32 || event.target.value.length > max_length - 1) {
        if (event.charCode === 13) {
            return;
        } else {
            event.preventDefault();
        }
    }
}