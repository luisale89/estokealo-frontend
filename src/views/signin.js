import { useContext, useState } from "react";
import { Context } from "../store/appContex";
import { noSpace, validate_field, validateFormInputs } from "../helpers/validations";
import { handleChange } from "../helpers/handlers";

export const SignIn = () => {

    const {store, actions} = useContext(Context);

    const form_fields= {
        email: "user-email"
    }

    const [state, setState] = useState({
        fields: {
            [form_fields.email]: ""
        },
        feedback: {
            [form_fields.email]: {valid: true, msg: ""}
        }
    });

    const handleSubmit = (event) => { //event is the form that submit
        // se realiza validación de todos los requeridos y si todos son validos, se procede con el submit
        event.preventDefault();
        const {valid, feedback} = validateFormInputs(event.target.id, state.feedback) // valida todos los campos requeridos del formulario con id
        setState({
            feedback: feedback,
            ...state
        });

        if (!valid) { // si no fueron validados los campos requeridos
            console.log("formulario no cumple con las validaciones");
            return;
        }
        
        const result = actions.login_user(); // envío de formulario a API - Recibe mensajes desde backend y muestra feedback en formulario en caso de algún error.
        console.log(result);
    };

    const handleInputChange = (event) => {
        setState({
            fields: handleChange(event, state.fields),
            feedback: Object.assign(state.feedback, {[event.target.name]: {valid:true, msg:""}}),
            ...state
        })
    };

    const checkField = (event) => {
        setState({feedback: validate_field(event, state.feedback), ...state});
    };

    return (
        <div className="signin-view">
            <div className="form-container">
                <h1>Estokealo</h1>
                <p>Ingrese sus datos para iniciar sesión:</p>
                <form id="signin-form" onSubmit={handleSubmit} noValidate autoComplete="on">
                    {/* email field */}
                    <div className="form-group">
                        <label htmlFor={form_fields.email}>Correo electrónico:</label>
                        <span className={`invalid-tooltip ${state.feedback[form_fields.email].valid ? "valid" : "invalid"}`}>
                            {state.feedback[form_fields.email].msg}
                        </span>
                        <input
                            className={state.feedback[form_fields.email].valid ? "valid" : "invalid"}
                            type="email" 
                            placeholder="Ingesa tu correo electrónico" 
                            name={form_fields.email}
                            value={state.fields[form_fields.email]}
                            onChange={handleInputChange}
                            onKeyPress={noSpace}
                            onBlur={checkField}
                            disabled={store.loading}
                            required
                        />
                    </div>
                    {/* submit button */}
                    <div className="submit-container">
                        <button 
                            className="btn btn-primary"
                            type="submit"
                            disabled={store.loading}>
                                {store.loading ? <span>Cargando...</span> : "Siguiente"}
                        </button>
                    </div>
                </form>
                <p className="btn-link">¿no tienes cuenta? crea una cuenta</p>
            </div>
            {store.loading && <span>loading signing...</span>}
            <div className="side-container">
            </div>
        </div>
    )
}