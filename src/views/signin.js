import { useContext, useState } from "react";
import { Context } from "../store/appContex";
import { noSpace, validate_field, validate_all } from "../helpers/validations";
import { handleChange } from "../helpers/handlers";

export const SignIn = () => {

    const {store, actions} = useContext(Context);

    const fieldRequired= {
        email: "user_email",
        password: "user_password"
    }

    const [state, setState] = useState({ //local Store
        controls: {
            passwordShown: false //para mostrar/ocultar la contraseña.
        },
        fields: {
            [fieldRequired.email]: "",
            [fieldRequired.password]: ""
        },
        feedback: {
            [fieldRequired.email]: {class: "", msg: ""},
            [fieldRequired.password]: {class: "", msg: ""}
        }
    });

    const handleSubmit = (event) => { //event is the form that submit
        // se realiza validación de todos los requeridos y si todos son validos, se procede con el submit
        event.preventDefault();
        if (state.controls.passwordShown) { //evita hacer las validaciones cuando el type del campo "password" es un texto.
            return;
        }
        const {valid, feedback} = validate_all(event.target.id, state.feedback) // valida todos los campos requeridos del formulario con id

        setState({
            feedback: feedback,
            ...state
        });

        if (valid) { // si todos los campos requeridos fueron validados
            const result = actions.login_user(); // envío de formulario a API - Recibe mensajes desde backend y muestra feedback en formulario en caso de algún error.
            console.log(result);
        } else {
            console.log("no cumple");
            return;
        };
    };

    const handleInputChange = (event) => { 
        setState({
            fields: handleChange(event, state.fields),
            feedback: Object.assign(state.feedback, {[event.target.name]:{class:"", msg:""}}),
            ...state
        })
    };

    const checkField = (event) => {
        setState({feedback: validate_field(event, state.feedback), ...state});
    };

    const showPassword = () => {
        setState({
            controls: Object.assign(state.controls, {passwordShown: true}),
            ...state
        });
    };

    const hidePassword = () => {
        setState({
            controls: Object.assign(state.controls, {passwordShown: false}),
            ...state
        });
    };
    return (
        <div className="signin-view">
            <form id="login-form" onSubmit={handleSubmit} noValidate autoComplete="on">
                {/* email field */}
                <div className="form-group g-1">
                    <label htmlFor={fieldRequired.email}>Usuario</label>
                    <span className={`invalid-tooltip ${state.feedback[fieldRequired.email].class}`}>{state.feedback[fieldRequired.email].msg}</span>
                    <input
                        className={state.feedback[fieldRequired.email].class}
                        type="email" 
                        placeholder="Ingesa tu usuario" 
                        name={fieldRequired.email}
                        value={state.fields[fieldRequired.email] || ""}
                        onChange={handleInputChange}
                        onKeyPress={noSpace}
                        onBlur={checkField}
                        disabled={store.loading_API}
                        required
                    />
                </div>
                {/* pasword field */}
                <div className="form-group g-2">
                    <label htmlFor={fieldRequired.password}>Contraseña</label>
                    <span className={`invalid-tooltip ${state.feedback[fieldRequired.password].class}`}>{state.feedback[fieldRequired.password].msg}</span>
                    <input 
                        className={state.feedback[fieldRequired.password].class}
                        type={state.controls.passwordShown ? "text" : "password"} //cambia para mostrar/esconder contraseña ingresada.
                        placeholder="Ingresa tu contraseña" 
                        name={fieldRequired.password}
                        value={state.fields[fieldRequired.password] || ""}
                        onKeyPress={noSpace}
                        onChange={handleInputChange}
                        onBlur={checkField}
                        disabled={store.loading_API}
                        required
                    />
                    <span 
                        className="show-password"
                        onMouseEnter={showPassword}
                        onMouseLeave={hidePassword}
                        >
                            <span>show_pw</span>
                    </span>
                </div>
                {/* submit button */}
                <div className="submit-container g-3">
                    <button 
                        className="btn"
                        type="submit"
                        disabled={store.loading_API}>
                            {store.loading_API ? <span>Cargando...</span> : "Aceptar"}
                    </button>
                </div>
            </form>
                <div id="signin-image">side image...</div>
        </div>
    )
}