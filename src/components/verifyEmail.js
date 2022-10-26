import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContex";
import { validate_field, validateFormInputs, codeRestrict } from "../helpers/validations";
import { handleChange } from "../helpers/handlers";
import PropTypes from "prop-types";

export const VerifyEmail = (props) => {

    //eslint-disable-next-line
    const {store, actions} = useContext(Context);

    const form_fields= {
        code: "six-digit-code"
    }
    
    const initialFormState = {
        fields: {
            [form_fields.code]: ""
        },
        feedback: {
            [form_fields.code]: {valid:true, msg: ""}
        }
    }

    const [form, setForm] = useState(initialFormState);
    const [codeSent, setCodeSent] = useState(false);

    const handleSubmit = (event) => { //event is the form that submit
        // se realiza validación de todos los requeridos y si todos son validos, se procede con el submit
        event.preventDefault();
        let {valid, feedback} = validateFormInputs(event.target.id, form.feedback) // valida todos los campos requeridos del formulario con id
        setForm({
            feedback: feedback,
            ...form
        });

        if (!valid) { // si no fueron validados los campos requeridos
            return null;
        }
        if (!codeSent) {
            actions.fetchData(`/auth/email-validation?email=${props.email}`, "GET")
            .then(data => {
                const { result, payload } = data
                console.log(payload);
                if (result === 200) {
                    sessionStorage.setItem("verification_token", payload.verification_token);
                    setCodeSent(true);
                }
                return null;
            });
        } else {
            const body = {
                "verification_code": parseInt(form.fields[form_fields.code])
            }
            const access_t = sessionStorage.getItem("verification_token");
            actions.fetchData("/auth/email-validation", "PUT", body, access_t)
            .then(data => {
                const { result, payload } = data
                console.log(payload);
                if (result === 200) {
                    sessionStorage.removeItem("verification_token");
                    sessionStorage.setItem("verified_token", payload.verified_token);
                    props.callback?.(); //ejecuta funcion pasada como prop.
                }
                return null;
            });
        }
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

    useEffect(() => {
        //clear sessionStorage
        window.sessionStorage.removeItem("verification_token");
        window.sessionStorage.removeItem("verified_token");

    }, []);

    return (
        <div className="card">
            <h5 className="card-title text-center pt-2">Verifica de tu dirección de correo electrónico: </h5>
            <div className="card-body">
                <p className="text-secondary">Se enviará un código de 6 dígitos a la dirección de 
                correo electrónico: <strong>{props.email}</strong></p>
                <form
                id="verification-form" 
                onSubmit={handleSubmit}
                noValidate
                autoComplete="on">
                    {/* code field */}
                    {codeSent ? 
                    <div className="mb-2 p-1">
                        <label htmlFor={form_fields.code} className="form-label">Código de 6 dígitos:</label>
                        <div id="codeHelp" className="form-text">
                            Ingresa el código de 6 dígitos enviado a tu correo electrónico para validarlo:
                        </div>
                        <input
                            className={`form-control ${form.feedback[form_fields.code].valid ? "" : "is-invalid"}`}
                            type="text"
                            placeholder="código" 
                            name={form_fields.code}
                            value={form.fields[form_fields.code]}
                            onChange={handleInputChange}
                            onKeyPress={codeRestrict}
                            onBlur={checkField}
                            disabled={store.loading}
                            id={form_fields.code}
                            required
                        />
                        <div className={`invalid-feedback ${form.feedback[form_fields.code].valid ? "" : "invalid"}`}>
                            {form.feedback[form_fields.code].msg}
                        </div>
                    </div>
                    : null}
                    {/* submit button */}
                    <div className="custom-submit-container">
                        <button 
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => {window.history.back()}}
                            disabled={store.loading}>
                                {`< atrás`}
                        </button>
                        <button 
                            className="btn btn-primary submit-btn custom-submit-btn"
                            type="submit"
                            disabled={store.loading}>
                                {store.loading ? <span>Cargando...</span> : codeSent ? "Validar código" : "Enviar código"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


VerifyEmail.propTypes = {
    email: PropTypes.string,
    callback: PropTypes.func
}