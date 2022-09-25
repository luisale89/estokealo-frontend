/*Este archivo contiene todas las validaciones que se van a aplicar a los formularios
invalid-tooltip es el nombre de la clase que se debe asignar a los mensajes que serán mostrados al
usuario como feedback.
- Cada función requiere como parámetro:
1.- El evento que fué disparado por el input en el formulario. (name, type, value)
2.- Campos que están en el state, los que sirven de moldes para ser actualizados como salida de cada función.
** Validate_all requiere como parámetro el id del formulario que se quiere validar, para que se pueda
encontrar a través del DOM e iterar cada uno de sus elementos **
Cada función retorna un objeto igual al state, que luego será actualizado en la función callback.
*/

export const fb_styles= { // util para mostrar feedback al usuario en los formularios.
    valid: "valid",
    invalid: "invalid"
};

const valid_types = ["text", "email", "password"]; // tipos de inputs que se están validando.

// estas son las validaciones..
const validations  = {
    email: (email) => { // cuando el tipo del campo a ser validado es email.
        const reEmail = /\S+@\S+\.\S+/; //expresion regular para verificar email.
        if (reEmail.test(email)) {
            return {valid: true, feedback: {class: fb_styles.valid, msg: "ok"}}
        } else {
            return {valid: false, feedback: {class: fb_styles.invalid, msg: "email es inválido"}}
        }
    },
    password: (passw) => { // cuando el tipo del campo a ser validado es password.
        const rePassw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; //expresion regular para verificar contraseña
        passw = typeof(passw) !== 'undefined' ? passw : "invalid";

        if (rePassw.test(passw)) {
            return {valid: true, feedback: {class: fb_styles.valid, msg: "Ok"}}
        } else {
            return {valid: false, feedback: {class: fb_styles.invalid, msg: "Contraseña inválida"}}
        }
    },
    text: (text) => { // cuando el tipo del campo a ser validado es texto.(sin caracteres especiales)
        const reText = /[^a-zA-Z -]/; //sin caracteres especiales
        
        if (reText.test(text)){
            return {valid: false, feedback: {msg: "Caracter especial", class: fb_styles.invalid}}
        } else {
            return {valid: false, feedback: {msg: "ok", class: fb_styles.valid}}
        }
    }
};

export const validate_field = (event, rq_fields_fb) => {
    const {name, type, value} = event.target;
    type = typeof(type) !== 'undefined' ? type : "text"; //default type for validations
    value = typeof(value) !== 'undefined' ? value : ""; //default value for validate

    if (!valid_types.includes(type)) {
        return Object.assign(rq_fields_fb, {[name]: {class: fb_styles.invalid, msg: "bug: invalid type"}})

    } else if (value.trim() === "") {
        return Object.assign(rq_fields_fb, {[name]: {class: fb_styles.invalid, msg: "Campo requerido"}})

    } else {
        return Object.assign(rq_fields_fb, {[name]: validations[type](value).feedback})
    }
};

export const validate_all = (form_id, rq_fields_fb) => { // will return an object with a valid flag and a object of feedback.
    const ele = document.getElementById(form_id);
    let feedback = {};
    let all_valid = true;

    for (let i = 0; i < ele.length; i++ ) {

        const {name, type, value, required} = ele[i]; //se desestructura cada elemento del formulario.

        if (required) {
            if (value.trim() === "") { // si el campo está vacío:
                feedback[name] = {class: fb_styles.invalid, msg: "Campo requerido"};
                all_valid = false;
            } else if (!valid_types.includes(type)) { // si el tipo del campo es inválido -> bug
                feedback[name] = {class: fb_styles.invalid, msg: "bug: invalid type"};
                all_valid = false;
            } else { // se ejecuta validación del campo.
                const rev = validations[type](value);
                feedback[name] = rev.feedback;
                all_valid = all_valid && rev.valid;
            }
        }
    }
    return({valid: all_valid, feedback: Object.assign(rq_fields_fb, feedback)});
};

export const noSpace = (event) => {
    if (event.charCode === 32) {
        event.preventDefault();
    }
}