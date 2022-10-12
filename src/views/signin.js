import { useContext, useState } from "react";
import { Context } from "../store/appContex";
import { noSpace, validate_field, validateFormInputs } from "../helpers/validations";
import { handleChange } from "../helpers/handlers";

export const SignIn = () => {

    const {store, actions} = useContext(Context);

    const form_fields= {
        email: "user-email"
    }

    const [form, setForm] = useState({
        fields: {
            [form_fields.email]: ""
        },
        feedback: {
            [form_fields.email]: {valid: true, msg: ""}
        }
    });

    const [userPublicInfo, setUserPublicInfo] = useState({});

    const handleSubmit = (event) => { //event is the form that submit
        // se realiza validación de todos los requeridos y si todos son validos, se procede con el submit
        event.preventDefault();
        const {valid, feedback} = validateFormInputs(event.target.id, form.feedback) // valida todos los campos requeridos del formulario con id
        setForm({
            feedback: feedback,
            ...form
        });

        if (!valid) { // si no fueron validados los campos requeridos
            console.log("formulario no cumple con las validaciones");
            return;
        }
        //promise
        actions.fetchData(`/auth/email-public-info?email=${form.fields[form_fields.email]}`)
        .then(data =>{
            const {result, payload} = data
            if (result === 404) {
                console.log("404 -> redirect to sigup form with data as prop")
            };
            setUserPublicInfo(payload);
        });
    };

    const handleInputChange = (event) => {
        setForm({
            fields: handleChange(event, form.fields),
            feedback: Object.assign(form.feedback, {[event.target.name]: {valid:true, msg:""}}),
            ...form
        })
    };

    const checkField = (event) => {
        setForm({feedback: validate_field(event, form.feedback), ...form});
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
                        <span className={`invalid-tooltip ${form.feedback[form_fields.email].valid ? "valid" : "invalid"}`}>
                            {form.feedback[form_fields.email].msg}
                        </span>
                        <input
                            className={form.feedback[form_fields.email].valid ? "valid" : "invalid"}
                            type="email" 
                            placeholder="Ingesa tu correo electrónico" 
                            name={form_fields.email}
                            value={form.fields[form_fields.email]}
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
            <div className="side-container">
                <span>{JSON.stringify(userPublicInfo || "")}</span>
            </div>
        </div>
    )
}